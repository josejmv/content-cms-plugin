/*
 *
 * HomePage
 *
 */
import React from "react";

import {
  Icon,
  Layout,
  ContentLayout,
  BaseHeaderLayout,
  EmptyStateLayout,
} from "@strapi/design-system";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import { Earth } from "@strapi/icons";

import { SmartcatApi } from "../../api/smartcat";

import { ActionButton, ArticlesTable, TranslationsTable } from "./";

const HomePage = () => {
  const [translations, setTranslations] = React.useState();
  const [showCreate, setShowCreate] = React.useState(false);

  const handleShowCreate = () => {
    setShowCreate(!showCreate);
  };

  /**
   * @description Fetch translations
   */
  React.useEffect(() => {
    if (!showCreate) {
      (async () => {
        const res = await SmartcatApi.getTranslations();
        setTranslations(res.translations);
      })();
    }
  }, [showCreate]);

  if (translations === undefined) return <LoadingIndicatorPage />;

  return (
    <>
      <Layout>
        <BaseHeaderLayout
          as="h2"
          title="Smartcat"
          subtitle="Generate translations of your published content with Smartcat"
        />

        <ContentLayout>
          {showCreate && (
            <ArticlesTable
              translations={translations}
              handleClose={handleShowCreate}
            />
          )}
          {!showCreate && (
            <>
              {translations.length === 0 ? (
                <EmptyStateLayout
                  icon={
                    <Icon
                      as={Earth}
                      width={`10rem`}
                      height={`10rem`}
                      color="secondary500"
                    />
                  }
                  content="You don't have any translations yet..."
                  action={
                    <ActionButton submit action={handleShowCreate}>
                      Create translation
                    </ActionButton>
                  }
                />
              ) : (
                <TranslationsTable
                  translations={translations}
                  handleShowCreate={handleShowCreate}
                />
              )}
            </>
          )}
        </ContentLayout>
      </Layout>
    </>
  );
};

export default HomePage;
