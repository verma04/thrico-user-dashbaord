"use client";

import { ApolloLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloNextAppProvider,
} from "@apollo/client-integration-nextjs";
import UploadHttpLink from "apollo-upload-client/UploadHttpLink.mjs";
import { onError } from "@apollo/client/link/error";
import { SetContextLink } from "@apollo/client/link/context";
import { toast } from "@/components/ui/use-toast";

function makeClient() {
  // Error handling link
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        toast({
          title: "GraphQL Error",
          description: message,
          variant: "destructive",
        });
      });
    }
    if (networkError) {
      toast({
        title: "Network Error",
        description: networkError.message,
        variant: "destructive",
      });
    }
  });

  // Auth link using SetContextLink (new API)
  const authLink = new SetContextLink((prevContext, operation) => {
    let token = "";
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("token");
      token =
        stored === null
          ? ""
          : JSON.parse(stored || "{}").state?.token || "";
    }
    return {
      headers: {
        ...prevContext.headers,
        authorization: token,
      },
    };
  });

  // Upload link
  const uploadLink = new UploadHttpLink({
    uri: "http://192.168.29.121:2222/graphql",
    headers: {
      "Apollo-Require-Preflight": "true",
    },
  });

  // Combine links: error -> auth -> upload
  const link = ApolloLink.from([errorLink, authLink, uploadLink]);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
