import React from "react";

import {
  Tr,
  Td,
  Th,
  Box,
  Table,
  Thead,
  Tbody,
  Typography,
  VisuallyHidden,
} from "@strapi/design-system";
import { ArrowLeft } from "@strapi/icons";
import { articlesApi } from "../../../api";

import { ActionButton, CreateModal } from "./";

const ArticlesTable = ({ translations, handleClose }) => {
  const [articles, setArticles] = React.useState();
  const [selectedArticle, setSelectedArticle] = React.useState();

  const isAlreadyTranslated = (article) => {
    return translations.some(
      (translation) => translation.articleId === `${article.id}`
    );
  };

  /**
   * @description Handle select article
   */
  const handleSelectArticle = (article) => {
    setSelectedArticle(article);
  };

  /**
   * @description Fetch articles from Strapi
   */
  React.useEffect(() => {
    (async () => {
      const res = await articlesApi.getArticles();
      setArticles(res);
    })();
  }, []);

  return (
    <>
      <Box
        padding={3}
        hasRadius={true}
        background="neutral0"
        shadow="filterShadow"
      >
        <ActionButton variant="secondary" action={handleClose}>
          <ArrowLeft />
        </ActionButton>
        <Table colCount={4} rowCount={10}>
          <Thead>
            <Tr>
              <Th>
                <Typography variant="sigma">ID</Typography>
              </Th>

              <Th>
                <Typography variant="sigma">Title</Typography>
              </Th>

              <Th>
                <Typography variant="sigma">Default locale</Typography>
              </Th>

              <Th>
                <VisuallyHidden>Actions</VisuallyHidden>
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {articles &&
              articles.data.map((article) => (
                <Tr key={article.id}>
                  <Td>
                    <Typography textColor="neutral800">{article.id}</Typography>
                  </Td>

                  <Td>
                    <Typography textColor="neutral800">
                      {article.attributes.title}
                    </Typography>
                  </Td>

                  <Td>
                    <Typography textColor="neutral800">
                      {article.attributes.locale}
                    </Typography>
                  </Td>

                  {isAlreadyTranslated(article) ? (
                    <Td>
                      <ActionButton action={() => console.log("UPDATE")}>
                        Update
                      </ActionButton>
                    </Td>
                  ) : (
                    <Td>
                      <ActionButton
                        variant="secondary"
                        action={() => handleSelectArticle(article)}
                      >
                        Translate
                      </ActionButton>
                    </Td>
                  )}
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
      {selectedArticle && (
        <CreateModal
          article={selectedArticle}
          handleClose={() => handleSelectArticle(undefined)}
        />
      )}
    </>
  );
};

export default ArticlesTable;
