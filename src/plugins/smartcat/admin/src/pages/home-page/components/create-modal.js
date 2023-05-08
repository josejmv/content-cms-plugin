import React from "react";
import axios from "axios";

import {
  Loader,
  ModalBody,
  Typography,
  ModalFooter,
  ModalLayout,
  ModalHeader,
  MultiSelectNested,
} from "@strapi/design-system";

import { ActionButton } from ".";

const CreateModal = ({ article, handleClose }) => {
  const [selectedTranslations, setSelectedTranslations] = React.useState([]);
  const targetLanguages = () => selectedTranslations.join();
  const [languages, setLanguages] = React.useState();

  const getProjectData = {
    domain: "https://smartcat.com",
    endpoint: "api/integration/v1/project",
    projectId: "d05ee031-cee1-49fe-8bc1-60f948082ee0",
  };

  const postDocumentData = {
    domain: "https://smartcat.com",
    endpoint: "api/integration/v1/project/document",
    projectId: "d05ee031-cee1-49fe-8bc1-60f948082ee0",
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const formatedArticle = { ...article.attributes };
    delete formatedArticle.locale;
    delete formatedArticle.createdAt;
    delete formatedArticle.updatedAt;
    delete formatedArticle.publishedAt;
    delete formatedArticle.localizations;

    const formatedJson = {
      units: Object.values(formatedArticle).map((value) => value),
    };
    const file = new Blob([JSON.stringify(formatedJson)], {
      type: "text/plain",
    });
    const formData = new FormData();
    formData.set("file", file, `article-${article.id}.json`);

    try {
      const responseForGetProject = await axios({
        method: "GET",
        url: `${getProjectData.domain}/${getProjectData.endpoint}/${getProjectData.projectId}`,
        headers: {
          Authorization:
            "Basic NmU2YzUzNWUtZjUyMi00YWMyLWFlMmEtMmM4YjVkMzliZGFmOjNfM3oxdTRLdzc2dmVpM0w0Vnc3dDdJUjNJYg==",
        },
      });

      console.log({ responseForGetProject });

      const responseForUploadDocument = await axios({
        method: "POST",
        data: formData,
        url: `${postDocumentData.domain}/${postDocumentData.endpoint}`,
        params: {
          projectId: postDocumentData.projectId,
          targetLanguages: targetLanguages(),
        },
        headers: {
          Authorization:
            "Basic NmU2YzUzNWUtZjUyMi00YWMyLWFlMmEtMmM4YjVkMzliZGFmOjNfM3oxdTRLdzc2dmVpM0w0Vnc3dDdJUjNJYg==",
        },
      });

      console.log({ responseForUploadDocument });
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://be01-186-28-59-1.ngrok-free.app/api/i18n/locales",
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

      setLanguages(
        response
          .map((language) => ({
            label: language.name,
            value: language.code,
          }))
          .filter((language) => language.value !== article.attributes.locale)
      );
    })();
  }, []);

  return (
    <ModalLayout
      as="form"
      labelledBy="title"
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <ModalHeader>
        <Typography fontWeight="bold" as="h2" id="title">
          Create translation for <b>{article.attributes.title}</b>
        </Typography>
      </ModalHeader>

      <ModalBody>
        <Typography fontWeight="bold" as="label" htmlFor="languages" id="title">
          Languages
        </Typography>
        <br />

        {languages === undefined ? (
          <Loader small />
        ) : (
          <MultiSelectNested
            required
            id="languages"
            options={languages}
            value={selectedTranslations}
            onChange={setSelectedTranslations}
            placeholder="Choose one or more languages"
            onClear={() => setSelectedTranslations([])}
          />
        )}
      </ModalBody>

      <ModalFooter
        startActions={<ActionButton variant="secondary">Cancel</ActionButton>}
        endActions={
          <ActionButton submit action={handleSubmit}>
            Translate
          </ActionButton>
        }
      />
    </ModalLayout>
  );
};

export default CreateModal;
