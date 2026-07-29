export interface DocumentChunk {
  id: string;
  content: string;
  metadata: {
    source: string;
    page?: number;
    section?: string;
  };
  score?: number;
}

export interface RAGQuery {
  query: string;
  businessId: string;
  topK?: number;
  filters?: Record<string, unknown>;
}

export class RAGEngine {
  async query(ragQuery: RAGQuery): Promise<DocumentChunk[]> {
    // TODO: Implement with Qdrant vector search
    // 1. Embed query
    // 2. Search vector DB
    // 3. Rerank results
    // 4. Return top K
    return [];
  }

  async ingestDocument(
    businessId: string,
    documentId: string,
    content: string,
    metadata: Record<string, unknown>,
  ): Promise<void> {
    // TODO: Implement document ingestion
    // 1. Chunk document
    // 2. Embed chunks
    // 3. Store in Qdrant
  }

  async deleteDocument(businessId: string, documentId: string): Promise<void> {
    // TODO: Delete from vector DB
  }
}
