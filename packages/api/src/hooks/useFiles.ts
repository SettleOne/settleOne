import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";

export function useDealFiles(dealId: string | undefined, context?: string) {
  return useQuery({
    queryKey: ["files", dealId, context],
    queryFn: () =>
      apiClient<{ files: any[] }>(`/deals/${dealId}/files`, {
        params: context ? { context } : {},
      }),
    enabled: !!dealId,
  });
}

export function useUploadFile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      dealId,
      context,
      file,
    }: {
      dealId: string;
      context: "delivery" | "evidence" | "dispute" | "terms";
      file: File;
    }) => {
      const fd = new FormData();
      fd.append("dealId", dealId);
      fd.append("context", context);
      fd.append("file", file);
      return apiClient<any>("/files/upload", {
        method: "POST",
        body: fd,
        headers: {}, // Let browser set Content-Type with boundary
      });
    },
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ["files", vars.dealId] });
    },
  });
}

export function useFileDownloadUrl(fileId: string | undefined) {
  return useQuery({
    queryKey: ["fileUrl", fileId],
    queryFn: () => apiClient<{ url: string }>(`/files/${fileId}/download`),
    enabled: !!fileId,
  });
}
