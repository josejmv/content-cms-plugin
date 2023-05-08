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

import { CreateModal, ActionButton } from "./";

const ArticleTable = ({ articles }) => {
  const [articleToTranslate, setArticleToTranslate] = React.useState();
  const [showCreate, setShowCreate] = React.useState(false);

  /**
   * @description Handle show create modal
   */
  const handleShowCreate = (article) => {
    setShowCreate(!showCreate);
    setArticleToTranslate(article);
  };

  return (
    <>
      <Box
        padding={8}
        hasRadius={true}
        background="neutral0"
        shadow="filterShadow"
      >
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
            {articles.data.map((article) => (
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

                <Td>
                  <ActionButton
                    action={() => handleShowCreate(article)}
                    variant="secondary"
                  >
                    Translate
                  </ActionButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {showCreate && (
        <CreateModal
          article={articleToTranslate}
          handleClose={handleShowCreate}
        />
      )}
    </>
  );
};

export default ArticleTable;
