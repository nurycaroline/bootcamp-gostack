import IMailTemplateProvider from "../model/IMailTemplateProvider";

class FakeMailTemplateProviders implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return "Mail content";
  }
}

export default FakeMailTemplateProviders;
