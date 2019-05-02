import { Item } from './item';
import { Resource } from './resource';

export interface Event extends Item {
    start: Date;
    end: Date;
    resources: Resource[];
}
