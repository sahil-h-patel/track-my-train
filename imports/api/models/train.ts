import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export interface Car {
    car_no: string;
    car_position: number;
    car_rest: boolean;
    cur_percentage: number;
    cur_capacity_color?: string; // Optional
    cur_passenger_count: number;
}

export interface Section {
    section_position: string;
    cur_percentage: number;
    cur_capacity_color?: string; // Optional
    cur_passenger_count: number;
    cars: Car[];
}

export interface Capacity {
    vehicle_no: string;
    latitude: string;
    longitude: string;
    created_time: Date;
    vehicle_type: string;
    cur_percentage: number;
    cur_capacity_color?: string; 
    cur_passenger_count: number;
    sections: Section[];
}

const Trains = new Mongo.Collection('trains');

const CarSchema = new SimpleSchema({
    car_no: { type: String, required: true },
    car_position: { type: Number, required: true },
    car_rest: { type: Boolean, required: true },
    cur_percentage: { type: Number, required: true },
    cur_passenger_count: { type: Number, required: true },
});

const SectionSchema = new SimpleSchema({
    section_position: { type: String, required: true },
    cur_percentage: { type: Number, required: true },
    cur_passenger_count: { type: Number, required: true },
    'cars.$': CarSchema,
});

export const CapacitySchema = new SimpleSchema({
    vehicle_no: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    created_time: { type: Date, required: true },
    vehicle_type: { type: String, required: true },
    cur_percentage: { type: Number, required: true },
    cur_passenger_count: { type: Number, required: true },
    'sections.$': SectionSchema,
});

const TrainSchema = new SimpleSchema({
    trainId: { type: String, required: true},
    line: { type: String, required: true},
    track: { type: String, required: true},
    color: { type: String},
    'capacity.$': CapacitySchema
});

Trains.attachSchema(TrainSchema);

