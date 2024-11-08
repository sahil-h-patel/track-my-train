import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Capacity, CapacitySchema } from './train';

// Define your TypeScript interfaces
export interface StationMsg {
    msg_type: string;
    msg_text: string;
    msg_pubdate: Date;
    msg_agency?: string; // Optional
    msg_station_scope: string;
    msg_line_scope: string;
}

export interface Stop {
    station_2char: string;
    station_name: string;
    time: Date;
    pickup?: string; // Optional
    dropoff?: string; // Optional
    departed: boolean;
    stop_status: string;
    dep_time: Date;
    time_utc_format: Date;
    stop_lines: string[];
}

export interface TrainItem {
    sched_dep_date: Date;
    destination: string;
    track?: string; // Optional
    line: string;
    train_id: string;
    status: string;
    sec_late: string;
    last_modified: Date,
    gpslatitude: string; 
    gpslongitude: string; 
    gpstime?: Date; 
    station_position: string;
    linecode: string;
    lineabbreviation?: string; // Optional
    capacity: Capacity[];
    stops: Stop[];
}

export interface StationItem {
    sched_dep_date: Date
    destination: string
    track: string
    line: string
    train_id: string
    connecting_train_id: string
    station_position: string;
    direction: string;
    dwell_time?: string;
    perm_pickup?: string;
    perm_dropoff?: string;
    stop_code?: string;
}

export interface StationTrainSchedule {
    station_2char: string;
    station_name: string;
    station_msgs: StationMsg[];
    items: TrainItem[];
}

export interface StationSchedule {
    station_2char: string;
    station_name: string;
    items: StationItem[];
}

// Create MongoDB collections
const StationTrainSchedules = new Mongo.Collection<StationTrainSchedule>('trainSchedules');
const StationSchedules = new Mongo.Collection<StationSchedule>('stationSchedules');

// Define the StationMsg schema
const StationMsgSchema = new SimpleSchema({
    msg_type: { type: String, required: true },
    msg_text: { type: String, required: true },
    msg_pubdate: { type: Date, required: true },
    msg_agency: { type: String, optional: true },
    msg_station_scope: { type: String, required: true },
    msg_line_scope: { type: String, required: true },
});

// Define the Stop schema
const StopSchema = new SimpleSchema({
    station_2char: { type: String, required: true },
    station_name: { type: String, required: true },
    time: { type: Date, required: true },
    pickup: { type: String, optional: true },
    dropoff: { type: String, optional: true },
    departed: { type: Boolean, required: true },
    stop_status: { type: String, required: true },
    dep_time: { type: Date, required: true },
    time_utc_format: { type: Date, required: true },
    stop_lines: { type: Array, required: true },
    'stop_lines.$': { type: String }, // Define the type for array elements
});

const TrainItemSchema = new SimpleSchema({
    sched_dep_date: {type: Date, required: true},
    destination: {type: String, required: true},
    track: {type: String, required: false},
    line: {type: String, required: true},
    status: {type: String, required: true},
    sec_late: {type: String, required: true},
    last_modified: {type: Date, required: true},
    latitude: {type: String, required: true},
    longitude: {type: String, required: true},
    gps_time: {type: Date, required: true},
    station_pos: {type: String, required: true},
    linecode: {type: String, required: true},
    line_abbrv: {type: String, required: true},
    'capacity.$': CapacitySchema,
    'stops.$': StopSchema
});

const StationItemSchema = new SimpleSchema({
    sched_dep_date: {type: Date, required: true},
    destination: {type: String, required: true},
    track: {type: String, required: false},
    line: {type: String, required: true},
    train_id: {type: String, required: true},
    connecting_train_id: {type: String, required: true},
    station_pos: {type: String, required: true},
    direction: {type: String, required: true},
    dwell_time: {type: String, required: true},
    perm_pickup: {type: String, required: true},
    perm_dropoff: {type: String, required: true},
    stop_code: {type: String, required: true},
});

// Define the TrainSchedule schema
const StationTrainScheduleSchema = new SimpleSchema({
    station_2char: {type: String, required: true},
    station_name: {type: String, required: true},
    'station_msgs.$': StationMsgSchema,
    'items.$': TrainItemSchema
});

// Define the StationSchedule schema
const StationScheduleSchema = new SimpleSchema({
    station_2char: { type: String, required: true },
    station_name: { type: String, required: true },
    'items.$': StationItemSchema, // Array of TrainSchedule objects
});

// Attach the schemas to the collections
StationTrainSchedules.attachSchema(StationTrainScheduleSchema);
StationSchedules.attachSchema(StationScheduleSchema);

// Export the collections for use in other parts of your application
export { StationTrainSchedules, StationSchedules };
