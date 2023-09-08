import { NextFunction, Request, Response } from "express";

import Component from "../models/component";
import error from "../utils/customErrorHandler";
import { success } from "../network/response";
import Banner from "../models/banner";
import Card from "../models/card";
import GroupBanner from "../models/group-banner";
import GroupCard from "../models/group-card";
import Section from "../models/section";
import Platform from "../models/platform";
import Page from "../models/page";

interface filterQuery {
  [key: string]: string;
  platformName: string;
  pageName: string;
  sectionName: string;
  componentName: string;
}

const componentController = {
  getComponentByName: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    // #swagger.tags = ['Component']
    try {
      const { name } = req.params;

      const component = await Component.findOne({
        where: { name },
        include: [
          {
            model: Card,
            as: "cards",
          },
          {
            model: Banner,
            as: "banners",
          },
          {
            model: GroupBanner,
            as: "groupBanners",
          },
          {
            model: GroupCard,
            as: "groupCards",
          },
        ],
      });

      if (!component) throw error("Component not found", 400);

      success(req, res, component, 200);
    } catch (e) {
      next(e);
    }
  },
  getComponents: async (_req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Component']
    try {
      const component = await Component.findAll({
        include: [
          {
            model: Card,
            as: "cards",
          },
          {
            model: Banner,
            as: "banners",
          },
          {
            model: GroupBanner,
            as: "groupBanners",
          },
          {
            model: GroupCard,
            as: "groupCards",
          },
        ],
      });

      if (!component) throw error("Component not found", 400);

      success(_req, res, component, 200);
    } catch (e) {
      next(e);
    }
  },
  filterComponent: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Component']
    try {
      const { platformName, pageName, sectionName, componentName } =
        req.query as filterQuery;

      const platform = await Platform.findOne({
        where: { name: platformName },
        include: [
          {
            model: Page,
            where: { name: pageName },
            include: [
              {
                model: Section,
                where: { name: sectionName },
                include: [
                  {
                    model: Component,
                    where: { name: componentName },
                    include: [Card, Banner],
                  },
                ],
              },
            ],
          },
        ],
      });

      const component = platform?.pages?.[0].sections?.[0].components?.[0]

      if (!component) throw error("Component not found", 400);

      success(req, res, component, 200);
    } catch (e) {
      next(e);
    }
  },
  createComponent: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Component']
    try {
      const { name, sectionId } = req.body;
      const validateComponent = await Component.findOne({ where: { name } });

      if (validateComponent) throw error("Component already exists", 400);

      if (!sectionId) throw error("Section is required", 400);

      const component = await Component.create({ name, sectionId });

      const section = await Section.findByPk(sectionId);

      if (!section) throw error("Section not found", 400);

      component.setSection(sectionId);

      success(req, res, component, 201);
    } catch (e) {
      next(e);
    }
  },
  deleteComponent: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Component']
    const { name } = req.params;

    try {
      const component = await Component.destroy({ where: { name } });

      if (!component) throw error("Component not found", 400);
      success(req, res, component, 200);
    } catch (e) {
      next(e);
    }
  },
  updateComponent: async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Component']
    try {
      const { id } = req.params;
      const { name } = req.body;

      const component = await Component.findOne({
        where: {
          id,
        },
      });

      if (!component) throw error("Component not found", 400);

      const updatedComponent = await component.update({
        name,
      });

      success(req, res, updatedComponent, 200);
    } catch (e) {
      next(e);
    }
  },
};

export default componentController;
