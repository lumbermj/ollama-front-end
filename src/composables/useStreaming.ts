import { ref, reactive, type Ref } from 'vue'

interface StreamMetadata {
  [key: string]: any
}

interface StreamStats {
  totalDuration?: number
  [key: string]: any
}

interface StreamData {
  metadata: StreamMetadata | null
  content: string
  fullResponse: string
  stats: StreamStats | null
}

type StreamEvent =
  | { type: 'metadata'; [key: string]: any }
  | { type: 'content'; content: string; full_response: string }
  | { type: 'complete'; full_response: string; total_duration?: number }
  | { type: 'error'; message: string }

export function useStreaming() {
  const isStreaming: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)
  const streamData = reactive<StreamData>({
    metadata: null,
    content: '',
    fullResponse: '',
    stats: null
  })

  const resetStream = (): void => {
    streamData.metadata = null
    streamData.content = ''
    streamData.fullResponse = ''
    streamData.stats = null
    error.value = null
  }

  const startStream = async (url: string, query: string, options: RequestInit = {}): Promise<void> => {
    if (isStreaming.value) {
      console.warn('Stream already in progress')
      return
    }

    resetStream()
    isStreaming.value = true
    error.value = null

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'text/plain',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          ...options.headers
        },
        body: JSON.stringify({
          query: query,
          top_n: 3
        }),
        ...options
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          break
        }

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')

        // Keep the last incomplete line in buffer
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.trim()) {
            // Handle SSE format: "data: {...}"
            if (line.startsWith('data: ')) {
              const jsonStr = line.substring(6) // Remove "data: " prefix
              try {
                const data: StreamEvent = JSON.parse(jsonStr)
                handleStreamData(data)
              } catch (parseError) {
                console.warn('Failed to parse JSON from SSE:', jsonStr, parseError)
              }
            }
            // Handle lines that might not have the "data: " prefix
            else if (line.startsWith('{')) {
              try {
                const data: StreamEvent = JSON.parse(line)
                handleStreamData(data)
              } catch (parseError) {
                console.warn('Failed to parse JSON:', line, parseError)
              }
            }
          }
        }
      }

      // Handle any remaining data in buffer
      if (buffer.trim()) {
        if (buffer.startsWith('data: ')) {
          const jsonStr = buffer.substring(6)
          try {
            const data: StreamEvent = JSON.parse(jsonStr)
            handleStreamData(data)
          } catch (parseError) {
            console.warn('Failed to parse final SSE JSON:', jsonStr, parseError)
          }
        }
      }

    } catch (err) {
      error.value = (err as Error).message
      console.error('Streaming error:', err)
    } finally {
      isStreaming.value = false
    }
  }

  const handleStreamData = (data: StreamEvent): void => {
    switch (data.type) {
      case 'metadata':
        streamData.metadata = data
        break

      case 'content':
        streamData.content += data.content
        streamData.fullResponse = data.full_response
        break

      case 'complete':
        streamData.fullResponse = data.full_response
        streamData.stats = {
          totalDuration: data.total_duration
        }
        break

      case 'error':
        error.value = data.message
        break

      default:
        console.warn('Unknown stream data type:', (data as any).type)
    }
  }

  const stopStream = (): void => {
    isStreaming.value = false
  }

  return {
    isStreaming,
    error,
    streamData,
    startStream,
    stopStream,
    resetStream
  }
}