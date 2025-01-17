"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticatedRequest } from "@/config/request";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "@/config/firebase";

export interface IApiKey {
  name?: string;
  key: string;
  created_at: Date;
  user: string;
  last_used_at?: Date;
  permissions: string[];
  revoked: boolean;
}

const generateAccessToken = async ({
  permissions,
  name,
}: {
  permissions: string[];
  name: string;
}): Promise<string> => {
  const response = await authenticatedRequest.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/users/api-keys`,
    {
      name: name,
      permissions: permissions,
    }
  );
  return response.data;
};

const getApiKeys = async (): Promise<IApiKey[]> => {
  const response = await authenticatedRequest.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/users/api-keys`
  );
  return response.data;
};

const deleteApiKey = async (key: string): Promise<void> => {
  const response = await authenticatedRequest.delete(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/users/api-keys/${key}`
  );
  return response.data;
};

const regenerateApiKey = async (key: string): Promise<void> => {
  const response = await authenticatedRequest.patch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/users/api-keys/${key}/regenerate`
  );
  return response.data;
};

const revokeApiKey = async (key: string): Promise<void> => {
  const response = await authenticatedRequest.patch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/users/api-keys/${key}/revoke`
  );
  return response.data;
};

export const useGenerateAccessToken = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: generateAccessTokenMutation, isPending } = useMutation({
    mutationFn: ({
      permissions,
      name,
    }: {
      permissions: string[];
      name: string;
    }) => generateAccessToken({ permissions, name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiKeys"] });
    },
  });

  return { generateAccessTokenMutation, isPending };
};

export const useGetApiKeys = () => {
  const [user] = useAuthState(firebaseAuth);

  const { data, isLoading ,refetch} = useQuery({
    queryKey: ["apiKeys"],
    queryFn: getApiKeys,
    enabled: user ? true : false,
  });
  console.log("data", data);

  return { apiKeys: data, isLoading ,refetch };
};

export const useDeleteApiKey = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteApiKeyMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiKeys"] });
    },
  });

  return { deleteApiKeyMutation, isDeleting };
};

export const useRegenerateApiKey = () => {
  const queryClient = useQueryClient();
  const { mutate: regenerateApiKeyMutation, isPending: isRegenerating } =
    useMutation({
      mutationFn: regenerateApiKey,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["apiKeys"] });
      },
    });

  return { regenerateApiKeyMutation, isRegenerating };
};

export const useRevokeApiKey = () => {
  const queryClient = useQueryClient();
  const { mutate: revokeApiKeyMutation, isPending: isRevoking } = useMutation({
    mutationFn: revokeApiKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["apiKeys"] });
    },
  });

  return { revokeApiKeyMutation, isRevoking };
};
