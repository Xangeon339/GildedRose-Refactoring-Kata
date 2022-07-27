import internal = require("stream");
import { isPartiallyEmittedExpression } from "typescript";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {

    this.items.forEach(item => {
      
      switch(item.name){

        case 'Aged Brie':
          item = this.ProcessAgedBrie(item);
        break;

        case 'Backstage passes to a TAFKAL80ETC concert':
          item = this.ProcessBackstage(item);
        break;

        case 'Sulfuras, Hand of Ragnaros':
          item = this.ProcessSulfuras(item);
        break;

        case 'Conjured Mana Cake':
          item = this.ProcessConjured(item);
        break;

        default:
          item = this.ProcessStandart(item);
        break;
      }


    });

    return this.items;
  }

  CheckStandarts(item:Item):Item{
    item.sellIn > 0 ? item.sellIn-- : item.sellIn = 0;
    if(item.quality < 0) item.quality = 0;
    if(item.quality > 50) item.quality = 50;
    return item;
  }

  ProcessStandart(item:Item):Item{

    if(item.sellIn == 0) item.quality--;

    item.quality--;

    item = this.CheckStandarts(item);

    return item;
  }

  ProcessAgedBrie(item:Item):Item{

    if(item.quality < 50) item.quality++;

    item = this.CheckStandarts(item);

    return item;
  }

  ProcessConjured(item:Item):Item{

    if(item.quality > 0) item.quality -= 2;
    
    item = this.CheckStandarts(item);

    return item;
  }

  ProcessSulfuras(item:Item):Item{

    item = this.CheckStandarts(item);

    return item;
  }

  ProcessBackstage(item:Item):Item{

    if(item.sellIn > 10 ) item.quality++;

    if(item.sellIn <= 10 && item.sellIn >= 4) item.quality += 2;

    if(item.sellIn <=3 && item.sellIn > 0) item.quality += 3 ;

    if(item.sellIn == 0) item.quality = 0;

    item = this.CheckStandarts(item);

    return item;
  }

}
