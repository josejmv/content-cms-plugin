import React from "react";

import {
  Loader,
  ModalBody,
  Typography,
  ModalFooter,
  ModalLayout,
  ModalHeader,
  MultiSelectNested,
} from "@strapi/design-system";

import { getProject, uploadDocument } from "../../../api/smartcat";

import { ActionButton } from ".";

const CreateModal = ({ article, handleClose }) => {
  const [selectedTranslations, setSelectedTranslations] = React.useState([]);
  const targetLanguages = () => selectedTranslations.join();
  const [loading, setLoading] = React.useState(false);
  const [languages, setLanguages] = React.useState();

  /**
   * @description Handle submit form event to create a new translation
   */
  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const formatedArticle = { ...article.attributes, id: article.id };
    delete formatedArticle.locale;
    delete formatedArticle.createdAt;
    delete formatedArticle.updatedAt;
    delete formatedArticle.publishedAt;
    delete formatedArticle.localizations;

    const formatedJson = {
      units: Object.values(formatedArticle).map((value) => value),
    };

    try {
      setLoading(true);
      const res = await uploadDocument({
        article: { formatedJson, id: article.id },
        targetLanguages: targetLanguages(),
      });
      setLoading(false);

      console.log(res);

      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * @description Fetch project to get target languages and allowed locales
   */
  React.useEffect(() => {
    (async () => {
      const res = await getProject();
      const SMTargetLanguages = res.data.targetLanguages;

      const response = await fetch("http://localhost:1337/api/i18n/locales", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer 73d80b1c10c017b85775dd9cab5e98ba24bc53f2b2a63d1a44b1a333d63edaabf9f020ed08b6c74a512c10e677b056c5f27775ae75f5d197f175f603b3400d94486d6a2d24f45713af46cc9b318a3bf70b7eadb017f7304892a5ee21821ea7d082b8f9572ce042d9e2652729822e1c5104d2d0b9926eef7eeb56a67e071b5f0f",
        },
      }).then((res) => res.json());

      const allowedLocales = response
        .filter((language) => SMTargetLanguages.includes(language.code))
        .map((language) => ({
          label: language.name,
          value: language.code,
        }))
        .filter((language) => language.value !== article.attributes.locale);

      setLanguages(allowedLocales);
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
          <ActionButton submit action={!loading && handleSubmit}>
            {loading ? "Cargando" : "Translate"}
          </ActionButton>
        }
      />
    </ModalLayout>
  );
};

export default CreateModal;
