import SyntaxHighlighter from 'react-syntax-highlighter'

interface DocumentationProps {
  sampleRequest: string
  sampleResponse: string
}

const Documentation = ({
  sampleRequest,
  sampleResponse,
}: DocumentationProps) => {
  return (
    <div style={{ width: '800px' }}>
      <h3 className="text-center mt-5">Documentation</h3>
      Sample Request (Node.js)
      <SyntaxHighlighter
        lineProps={{ style: { overflow: 'auto' } }}
        language="javascript"
      >
        {sampleRequest}
      </SyntaxHighlighter>
      Sample Response (json)
      <SyntaxHighlighter
        lineProps={{ style: { overflow: 'auto' } }}
        language="json"
      >
        {sampleResponse}
      </SyntaxHighlighter>
    </div>
  )
}

export default Documentation
