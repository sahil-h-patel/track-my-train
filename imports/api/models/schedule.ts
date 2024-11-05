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

export interface TrainSchedule {
    sched_dep_date: Date;
    destination: string;
    track?: string; // Optional
    line: string;
    train_id: string;
    status: string;
    sec_late: number;
    gpslatitude?: string; // Optional
    gpslongitude?: string; // Optional
    gpstime?: Date; // Optional
    station_position: string;
    linecode: string;
    lineabbreviation?: string; // Optional
    capacity: Capacity[];
    stops: Stop[];
}

export interface StationSchedule {
    station_2char: string;
    station_name: string;
    station_msgs: StationMsg[];
    items: TrainSchedule[];
}

// Create MongoDB collections
const TrainSchedules = new Mongo.Collection<TrainSchedule>('trainSchedules');
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

// Define the TrainSchedule schema
const TrainScheduleSchema = new SimpleSchema({
    sched_dep_date: { type: Date, required: true },
    destination: { type: String, required: true },
    track: { type: String, optional: true },
    line: { type: String, required: true },
    train_id: { type: String, required: true },
    status: { type: String, required: true },
    sec_late: { type: Number, required: true },
    gpslatitude: { type: String, optional: true },
    gpslongitude: { type: String, optional: true },
    gpstime: { type: Date, optional: true },
    station_position: { type: String, required: true },
    linecode: { type: String, required: true },
    lineabbreviation: { type: String, optional: true },
    capacity: { type: Array, required: true },
    'capacity.$': CapacitySchema, // Array of Capacity objects
    stops: { type: Array, required: true },
    'stops.$': StopSchema, // Array of Stop objects
});

// Define the StationSchedule schema
const StationScheduleSchema = new SimpleSchema({
    station_2char: { type: String, required: true },
    station_name: { type: String, required: true },
    station_msgs: { type: Array, required: true },
    'station_msgs.$': StationMsgSchema, // Array of StationMsg objects
    items: { type: Array, required: true },
    'items.$': TrainScheduleSchema, // Array of TrainSchedule objects
});

// Attach the schemas to the collections
TrainSchedules.attachSchema(TrainScheduleSchema);
StationSchedules.attachSchema(StationScheduleSchema);

// Export the collections for use in other parts of your application
export { TrainSchedules, StationSchedules };
