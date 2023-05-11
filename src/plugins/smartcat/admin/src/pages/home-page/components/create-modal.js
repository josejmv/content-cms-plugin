import React from "react";

import {
  Loader,
  ModalBody,
  Typography,
  ModalLayout,
  ModalHeader,
  ModalFooter,
  MultiSelectNested,
} from "@strapi/design-system";

import { ActionButton } from ".";

import { SmartcatApi, i18nApi } from "../../../api";

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

    const formatedArticle = { ...article.attributes };
    delete formatedArticle.locale;
    delete formatedArticle.createdAt;
    delete formatedArticle.updatedAt;
    delete formatedArticle.publishedAt;
    delete formatedArticle.localizations;

    const formatedJson = {
      units: Object.values(formatedArticle).map((value) => value),
    };

    setLoading(true);

    try {
      const [translation] = await SmartcatApi.uploadDocument({
        targetLanguages: targetLanguages(),
        article: {
          formatedJson,
          id: article.id,
          locale: article.attributes.locale,
        },
      });

      await SmartcatApi.saveTranslation({
        ...translation,
        articleId: `${article.id}`,
      });
      handleClose();
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
    handleClose();
  };

  /**
   * @description Fetch project to get target languages and allowed locales
   */
  React.useEffect(() => {
    (async () => {
      const res = await SmartcatApi.getProject();
      const SMTargetLanguages = res.data.targetLanguages;

      const locales = await i18nApi.getLocales();

      const allowedLocales = locales
        .filter((language) => SMTargetLanguages.includes(language.code))
        .map((language) => ({
          label: language.name,
          value: language.code,
        }))
        .filter((language) => language.value !== article.locale);

      setLanguages(allowedLocales);
    })();
  }, []);

  return (
    <ModalLayout as="form" labelledBy="title" onClose={handleClose}>
      <ModalHeader>
        <Typography fontWeight="bold" as="h2" id="title">
          Create translation
        </Typography>
      </ModalHeader>

      <ModalBody>
        <Typography fontWeight="bold" as="label" htmlFor="languages" id="title">
          Languages
        </Typography>
        {languages === undefined ? (
          <Loader />
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
