import React from "react";

import {
  Tr,
  Td,
  Th,
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  TFooter,
  Typography,
  VisuallyHidden,
} from "@strapi/design-system";
import { Write, Trash, Download, Plus } from "@strapi/icons";

import { SmartcatApi } from "../../../api";
import { ActionButton } from "./";

const TranslationsTable = ({ handleShowCreate, translations }) => {
  /**
   * @description Delete file
   */
  const handleDelete = async (translation) => {
    try {
      await SmartcatApi.deleteDocument({
        id: translation.translationId,
      }).then(
        async () => await SmartcatApi.deleteTranslation({ id: translation.id })
      );
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @description Update file
   */
  const handleUpdate = async (translation) => {
    console.log(translation);
  };

  /**
   * @description Download file
   */
  const handleDownload = async (translation) => {
    console.log(translation);
  };

  return (
    <Box hasRadius background="neutral0" shadow="filterShadow">
      <Table
        colCount={4}
        rowCount={10}
        footer={
          <TFooter icon={<Plus />} onClick={handleShowCreate}>
            Add a translation
          </TFooter>
        }
      >
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">ID</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Article's ID</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Smartcat's ID</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Source language</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Target language</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">File's name</Typography>
            </Th>
            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>

        <Tbody>
          {translations.map((translation) => (
            <Tr key={translation.id}>
              <Td>
                <Typography textColor="neutral800">{translation.id}</Typography>
              </Td>

              <Td>
                <Typography textColor="neutral800">
                  {translation.articleId}
                </Typography>
              </Td>

              <Td>
                <Typography textColor="neutral800">
                  {translation.translationId}
                </Typography>
              </Td>

              <Td>
                <Typography textColor="neutral800">
                  {translation.sourceLanguage}
                </Typography>
              </Td>

              <Td>
                <Typography textColor="neutral800">
                  {translation.targetLanguage}
                </Typography>
              </Td>

              <Td>
                <Typography textColor="neutral800">
                  {translation.filename}
                </Typography>
              </Td>

              <Td>
                <Flex>
                  <ActionButton
                    variant="ghost"
                    style={{ padding: 10 }}
                    action={() => handleDownload(translation)}
                  >
                    <Download />
                  </ActionButton>
                  <ActionButton
                    variant="ghost"
                    style={{ padding: 10 }}
                    action={() => handleUpdate(translation)}
                  >
                    <Write />
                  </ActionButton>
                  <ActionButton
                    variant="ghost"
                    style={{ padding: 10 }}
                    action={() => handleDelete(translation)}
                  >
                    <Trash />
                  </ActionButton>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TranslationsTable;
