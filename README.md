# Track My Train

## Project Outline

This project will integrate with the NJTransit API to provide real-time train schedule information. Using Meteor.js with MongoDB, React, and TailwindCSS.

---

## Development Plan

### 1. Database and Models

- [x] Implement models for data structure.
- [x] Set up MongoDB collections with schema validation.
- [ ] Test collections and models with mock data to verify structure.

### 2. NJTransit API Integration

#### Authentication
- [ ] **`getToken` / `isValidToken`**:
  - [ ] Retrieve a token from NJTransit API.
  - [ ] Store the token in `.env` for secure access.

#### Data Retrieval and Storage
- [ ] **`getStationSchedule`**:
  - [ ] Retrieve schedule data for a station.
  - [ ] Parse JSON response and filter relevant data.
  - [ ] Populate MongoDB collection with station schedule details.

- [ ] **`getTrainSchedule`**:
  - [ ] Retrieve schedule data for a specific train.
  - [ ] Parse JSON response and filter relevant data.
  - [ ] Populate MongoDB collection with train schedule details.

#### Additional Feature Ideas
- Use **`getTrainStopList`** to retrieve detailed stop information for a train.
  - **Goal**: Cross-reference `getTrainSchedule` and `getStationSchedule` for a comprehensive data set.
  - **Challenge**: Integrate responses from multiple endpoints. Consider restructuring collections to enable joining data from both schedules and stop lists.

---

### Roadblock 1: aldeed:collection2 typescript configuration

I refered to the Meteor forums for this one:

https://forums.meteor.com/t/how-to-combine-typescript-and-simpleschema/28475/6

Natively Collection2 is javascript based so providing a TypeScript Interface solves this issue which is provided here.
