import Component from "./models/component";
import Page from "./models/page";
import Platform from "./models/platform";
import Section from "./models/section";

const seed = async () => {
  const platform = await Platform.create({ name: "aplicacion" });
  const page = await Page.create({ name: "home" });
  await page.setPlatform(platform);
  const section = await Section.create({ name: "tarjeta-membresia" });
  await section.setPage(page);
  const component = await Component.create({ name: "carrusel" });
  await component.setSection(section);
  console.log("Database seeded")
};

export default seed
