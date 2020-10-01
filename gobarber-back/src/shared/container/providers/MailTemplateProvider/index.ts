import { container } from "tsyringe";

import IMailTemplateProvider from "@shared/container/providers/MailTemplateProvider/model/IMailTemplateProvider";
import HandlebarsMailTemplateProvider from "@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider";

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  "MailTemplateProvider",
  providers.handlebars,
);
