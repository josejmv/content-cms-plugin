/*
 *
 * HomePage
 *
 */
import React from "react";

import {
  Layout,
  Loader,
  ContentLayout,
  BaseHeaderLayout,
} from "@strapi/design-system";

import { ArticlesTable } from "./";

const HomePage = () => {
  const [articles, setArticles] = React.useState();

  /**
   * @description Fetch articles
   */
  React.useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://be01-186-28-59-1.ngrok-free.app/api/articles?locale=all",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              "Bearer 73d80b1c10c017b85775dd9cab5e98ba24bc53f2b2a63d1a44b1a333d63edaabf9f020ed08b6c74a512c10e677b056c5f27775ae75f5d197f175f603b3400d94486d6a2d24f45713af46cc9b318a3bf70b7eadb017f7304892a5ee21821ea7d082b8f9572ce042d9e2652729822e1c5104d2d0b9926eef7eeb56a67e071b5f0f",
          },
        }
      ).then((res) => res.json());

      setArticles(response);
    })();
  }, []);

  return (
    <Layout>
      <BaseHeaderLayout
        as="h2"
        title="Smartcat"
        subtitle="Generate translations of your published content with Smartcat"
      />

      <ContentLayout>
        {articles === undefined ? (
          <Loader />
        ) : (
          <ArticlesTable articles={articles} />
        )}
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
