import Banner from './banner'
import Card from './card'
import Component from './component'
import GroupBanner from './group-banner'
import GroupCard from './group-card'
import Page from './page'
import Platform from './platform'
import Section from './section'

// INFO DE LAS RELACIONES ENTRE TABLAS ↓ ↓

// Cada Platform tiene una o varis Page
// Cada Page tiene uno o varias Section

// Cada Section tiene uno o varios Component

// Cada Component puede tener una o varias: Card, Banner, GroupCard o GroupBanner

// GroupCard tiene una o varias Card
// GroupBanner tiene una o varios Banner

// Relación entre Platform y Page
Platform.hasMany(Page, {
  foreignKey: 'platformId',
})
Page.belongsTo(Platform, {
  foreignKey: 'platformId',
})

// Relación entre Page y Section
Page.hasMany(Section, {
  foreignKey: 'pageId',
})
Section.belongsTo(Page, {
  foreignKey: 'pageId',
})

// Relación entre Section y Component
Section.hasMany(Component, {
  foreignKey: 'sectionId',
})
Component.belongsTo(Section, {
  foreignKey: 'sectionId',
})

// Relacion entre Component y Card
Component.hasMany(Card, { foreignKey: 'componentId' })
Card.belongsTo(Component, { foreignKey: 'componentId' })

// Relacion entre Component y Banner
Component.hasMany(Banner, { foreignKey: 'componentId' })
Banner.belongsTo(Component, { foreignKey: 'componentId' })

// Relacion entre Component y GroupCard
Component.hasMany(GroupCard, { foreignKey: 'componentId' })
GroupCard.belongsTo(Component, { foreignKey: 'componentId' })

// Relacion entre Component y GroupBanner
Component.hasMany(GroupBanner, { foreignKey: 'componentId' })
GroupBanner.belongsTo(Component, { foreignKey: 'componentId' })

// Relacion GroupCard y Card
GroupCard.belongsToMany(Card, {
  through: 'groupcard_cards',
  foreignKey: 'groupCardId',
})

Card.belongsToMany(GroupCard, {
  through: 'groupcard_cards',
  foreignKey: 'cardId',
})

// Relacion GroupBanner y Banner
Banner.belongsToMany(GroupBanner, {
  through: 'groupbanner_banners',
  foreignKey: 'bannerId',
})

GroupBanner.belongsToMany(Banner, {
  through: 'groupbanner_banners',
  foreignKey: 'groupBannerId',
})
