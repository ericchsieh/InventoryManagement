-- SQL file containing all create and insert table statements to autopopulate the database

--
-- Project Group 22
--
-- IT Asset Management Database
-- Andy Zhao, Eric Hsieh, Serdar Hasan
--

-- Table structure for IT

CREATE TABLE IT_Support(
    team_number int,
    phone_number varchar(15),
    PRIMARY KEY (team_number)
);

CREATE TABLE Building(
    building_code varchar(4),
    building_name varchar(255),
    address varchar(255),
    PRIMARY KEY (building_code)
);

CREATE TABLE Room(
    room_number int,
    building_code varchar(4),
    floor int,
    PRIMARY KEY (room_number, building_code),
    FOREIGN KEY (building_code) REFERENCES Building(building_code)
);

CREATE TABLE Faculty_Member(
    user_id int,
    full_name varchar(255),
    admin_access number(1),
    PRIMARY KEY (user_id)
);

CREATE TABLE Help_Desk(
    hid int,
    phone_number varchar(15),
    room_number int unique,
    building_code varchar(4),
    PRIMARY KEY (hid),
    FOREIGN KEY (room_number, building_code) REFERENCES Room(room_number, building_code)
);

CREATE TABLE Department(
    dept_name varchar(20),
    budget float,
    dept_head int not null,
    hid int unique not null,
    PRIMARY KEY (dept_name),
    FOREIGN KEY (dept_head) REFERENCES Faculty_Member(user_id),
    FOREIGN KEY (hid) REFERENCES Help_Desk(hid)
);

CREATE TABLE Ticket(
    ticket_number int,
    status varchar(20),
    date_created date,
    date_resolved date,
    help_desk int not null,
    submitted_by int not null,
    PRIMARY KEY (ticket_number),
    FOREIGN KEY (help_desk) REFERENCES Help_Desk(hid),
    FOREIGN KEY (submitted_by) REFERENCES Faculty_Member(user_id)
);

-- create assets and all other sub-entities of asset

CREATE TABLE Purchased_Asset(
    inv_number int,
    cost float,
    name varchar(50) not null,
    model varchar(50),
    dept varchar(20) not null,
    PRIMARY KEY (inv_number),
    FOREIGN KEY (dept) REFERENCES Department(dept_name)
);

CREATE TABLE Software_License(
    inv_number int,
    license_code varchar(20),
    PRIMARY KEY (inv_number),
    FOREIGN KEY (inv_number) REFERENCES Purchased_Asset(inv_number)
        ON DELETE CASCADE
);

CREATE TABLE Hardware(
    inv_number int,
    type varchar(50),
    specification varchar(50),
    PRIMARY KEY (inv_number),
    FOREIGN KEY (inv_number) REFERENCES Purchased_Asset(inv_number)
        ON DELETE CASCADE
);

CREATE TABLE Electronics(
    inv_number int,
    wattage int,
    serial_number varchar(50),
    PRIMARY KEY (inv_number),
    FOREIGN KEY (inv_number) REFERENCES Purchased_Asset(inv_number)
        ON DELETE CASCADE
);

-- End of Assets

CREATE TABLE Repairs_And_Maintains(
    team_number int,
    inv_number int,
    PRIMARY KEY (team_number, inv_number),
    FOREIGN KEY (team_number) REFERENCES IT_Support(team_number),
    FOREIGN KEY (inv_number) REFERENCES Purchased_Asset(inv_number)
);

CREATE TABLE Reserves_Asset(
    ticket_number int,
    inv_number int,
    PRIMARY KEY (ticket_number, inv_number),
    FOREIGN KEY (ticket_number) REFERENCES Ticket(ticket_number),
    FOREIGN KEY (inv_number) REFERENCES Purchased_Asset(inv_number)
);

CREATE TABLE Requests_IT_Support(
    ticket_number int,
    team_number int,
    PRIMARY KEY (ticket_number, team_number),
    FOREIGN KEY (ticket_number) REFERENCES Ticket(ticket_number),
    FOREIGN KEY (team_number) REFERENCES IT_Support(team_number)
);

CREATE TABLE Dept_Located_In(
    dept_name varchar(20),
    building varchar(4),
    PRIMARY KEY (dept_name, building),
    FOREIGN KEY (dept_name) REFERENCES Department(dept_name),
    FOREIGN KEY (building) REFERENCES Building(building_code)
);

CREATE TABLE Lab(
    lab_name varchar(50),
    phone_number varchar(15),
    homepage_url varchar(255),
    email varchar(150),
    PRIMARY KEY (lab_name)
);

CREATE TABLE Participates_In(
    user_id int,
    lab_name varchar(50),
    position varchar(150),
    PRIMARY KEY (user_id, lab_name),
    FOREIGN KEY (user_id) REFERENCES Faculty_Member(user_id),
    FOREIGN KEY (lab_name) REFERENCES Lab(lab_name) 
);

CREATE TABLE Lab_Located_In(
    lab_name varchar(50),
    room_number int,
    building_code varchar(4),
    PRIMARY KEY (lab_name, building_code, room_number),
    FOREIGN KEY (room_number, building_code) REFERENCES Room(room_number, building_code),
    FOREIGN KEY (lab_name) REFERENCES Lab(lab_name)
);

CREATE TABLE Contributes_To(
    lab_name varchar(50),
    dept_name varchar(20),
    PRIMARY KEY (lab_name, dept_name),
    FOREIGN KEY (lab_name) REFERENCES Lab(lab_name),
    FOREIGN KEY (dept_name) REFERENCES Department(dept_name)
);

-- insert values into table based on order of table creation

INSERT INTO IT_Support (team_number, phone_number) 
VALUES (1, '6041234567');
INSERT INTO IT_Support (team_number, phone_number) 
VALUES (2, '7784392384');
INSERT INTO IT_Support (team_number, phone_number) 
VALUES (3, '6041842934');
INSERT INTO IT_Support (team_number, phone_number) 
VALUES (4, '6044829384');
INSERT INTO IT_Support (team_number, phone_number) 
VALUES (5, '6043145314');

INSERT INTO Building (building_code, building_name, address)
VALUES ('ICCS', 'Institute for Computing Information and Computer Science/Cognitive Systems', '2366 Main Mall');
INSERT INTO Building (building_code, building_name, address)
VALUES ('DMP', 'Hugh Dempster Pavillion', '6245 Agronomy Rd');
INSERT INTO Building (building_code, building_name, address)
VALUES ('KENN', 'Douglas Kenny', '2136 West Mall');
INSERT INTO Building (building_code, building_name, address)
VALUES ('HENN', 'Hennings', '6224 Agricultural Road');
INSERT INTO Building (building_code, building_name, address)
VALUES ('BUCH', 'Buchanan', '1866 Main Mall');

INSERT INTO Room (room_number, building_code, floor)
VALUES (350, 'ICCS', 2);
INSERT INTO Room (room_number, building_code, floor)
VALUES (5, 'ICCS', 1);

INSERT INTO Room (room_number, building_code, floor)
VALUES (310, 'DMP', 3);
INSERT INTO Room (room_number, building_code, floor)
VALUES (210, 'DMP', 2);

INSERT INTO Room (room_number, building_code, floor)
VALUES (300, 'KENN', 3);
INSERT INTO Room (room_number, building_code, floor)
VALUES (210, 'KENN', 2);

INSERT INTO Room (room_number, building_code, floor)
VALUES (200, 'HENN', 2);
INSERT INTO Room (room_number, building_code, floor)
VALUES (201, 'HENN', 2);

INSERT INTO Room (room_number, building_code, floor)
VALUES (104, 'BUCH', 1);
INSERT INTO Room (room_number, building_code, floor)
VALUES (201, 'BUCH', 2);

INSERT INTO Faculty_Member (user_id, full_name, admin_access)
VALUES (22451884, 'Andy Zhao', 1);
INSERT INTO Faculty_Member (user_id, full_name, admin_access)
VALUES (30515167, 'Eric Hsieh', 1);
INSERT INTO Faculty_Member (user_id, full_name, admin_access)
VALUES (91621482, 'Serdar Hasan', 1);
INSERT INTO Faculty_Member (user_id, full_name, admin_access)
VALUES (12345678, 'John Doe', 0);
INSERT INTO Faculty_Member (user_id, full_name, admin_access)
VALUES (74723029, 'Jane Smith', 0);

INSERT INTO Help_Desk (hid, phone_number, room_number, building_code)
VALUES (1, '6049876543', 5, 'ICCS');
INSERT INTO Help_Desk (hid, phone_number, room_number, building_code)
VALUES (2, '6044832948', 201, 'HENN');
INSERT INTO Help_Desk (hid, phone_number, room_number, building_code)
VALUES (3, '7783294283', 310, 'DMP');
INSERT INTO Help_Desk (hid, phone_number, room_number, building_code)
VALUES (4, '6041938294', 300, 'KENN');
INSERT INTO Help_Desk (hid, phone_number, room_number, building_code)
VALUES (5, '6044829183', 104, 'BUCH');

INSERT INTO Department (dept_name, budget, dept_head, hid)
VALUES ('Computer Science', 50000.00, 22451884, 1);
INSERT INTO Department (dept_name, budget, dept_head, hid)
VALUES ('Psychology', 38000.00, 30515167, 4);
INSERT INTO Department (dept_name, budget, dept_head, hid)
VALUES ('Physics', 20000.00, 22451884, 2);
INSERT INTO Department (dept_name, budget, dept_head, hid)
VALUES ('Economics', 25000.00, 22451884, 3);
INSERT INTO Department (dept_name, budget, dept_head, hid)
VALUES ('Philosophy', 15000.00, 91621482, 5);

INSERT INTO Ticket (ticket_number, status, date_created, help_desk, submitted_by)
VALUES (20220001, 'Open', TO_DATE('2022-10-04', 'YYYY-MM-DD'), 1, 22451884);
INSERT INTO Ticket (ticket_number, status, date_created, help_desk, submitted_by)
VALUES (20220003, 'Open', TO_DATE('2022-10-04', 'YYYY-MM-DD'), 2, 74723029);
INSERT INTO Ticket (ticket_number, status, date_created, help_desk, submitted_by)
VALUES (20220004, 'Under Review', TO_DATE('2022-10-04', 'YYYY-MM-DD'), 3, 91621482);

INSERT INTO Ticket (ticket_number, status, date_created, date_resolved, help_desk, submitted_by)
VALUES (20220002, 'Resolved', TO_DATE('2022-10-13', 'YYYY-MM-DD'), TO_DATE('2022-11-15', 'YYYY-MM-DD'), 1, 12345678);
INSERT INTO Ticket (ticket_number, status, date_created, date_resolved, help_desk, submitted_by)
VALUES (20220005, 'Resolved', TO_DATE('2022-10-04', 'YYYY-MM-DD'), TO_DATE('2022-10-15', 'YYYY-MM-DD'), 1, 91621482);

INSERT INTO Purchased_Asset (inv_number, cost, name, model, dept)
VALUES (10000001, 1599.99, 'M1 Macbook Air', '512GB', 'Computer Science');
INSERT INTO Purchased_Asset (inv_number, cost, name, model, dept)
VALUES (10000002, 1399.99, 'M1 Macbook Air', '256GB', 'Computer Science');

INSERT INTO Purchased_Asset (inv_number, cost, name, model, dept)
VALUES (20000003, '139.99', 'MATLAB', '2021B', 'Physics');
INSERT INTO Software_License (inv_number, license_code)
VALUES (20000003, 'AC4X3 C63G4 5JB31');

INSERT INTO Purchased_Asset (inv_number, cost, name, model, dept)
VALUES (30000001, 19.99, 'Hex Spacer Standoffs', 'Jucoan M3', 'Computer Science');
INSERT INTO Hardware (inv_number, type, specification) 
VALUES (30000001, 'standoff', 'M3x12mm');

INSERT INTO Purchased_Asset (inv_number, cost, name, model, dept)
VALUES (40000001, 550.00, 'Intel Core i7', '12700K', 'Psychology');
INSERT INTO Electronics (inv_number, wattage, serial_number)
VALUES (40000001, 95, '2ZGfE5hU');

INSERT INTO Purchased_Asset (inv_number, cost, name, model, dept)
VALUES (40000002, 2099.99, 'NVIDIA GeForce RTX', 'RTX 4090', 'Computer Science');
INSERT INTO Electronics (inv_number, wattage, serial_number)
VALUES (40000002, 450, '5XWbE7i7');

INSERT INTO Repairs_And_Maintains (team_number, inv_number)
VALUES (1,10000001);
INSERT INTO Repairs_And_Maintains (team_number, inv_number)
VALUES (1,10000002);
INSERT INTO Repairs_And_Maintains (team_number, inv_number)
VALUES (2,40000001);
INSERT INTO Repairs_And_Maintains (team_number, inv_number)
VALUES (2,40000002);
INSERT INTO Repairs_And_Maintains (team_number, inv_number)
VALUES (3,30000001);
INSERT INTO Repairs_And_Maintains (team_number, inv_number)
VALUES (4,20000003);

INSERT INTO Reserves_Asset (ticket_number, inv_number)
VALUES (20220001, 10000001);
INSERT INTO Reserves_Asset (ticket_number, inv_number)
VALUES (20220003, 20000003);
INSERT INTO Reserves_Asset (ticket_number, inv_number)
VALUES (20220002, 40000002);
INSERT INTO Reserves_Asset (ticket_number, inv_number)
VALUES (20220005, 10000002);
INSERT INTO Reserves_Asset (ticket_number, inv_number)
VALUES (20220001, 10000002);

INSERT INTO Requests_IT_Support (ticket_number, team_number)
VALUES (20220001, 1);
INSERT INTO Requests_IT_Support (ticket_number, team_number)
VALUES (20220002, 2);
INSERT INTO Requests_IT_Support (ticket_number, team_number)
VALUES (20220003, 3);
INSERT INTO Requests_IT_Support (ticket_number, team_number)
VALUES (20220004, 4);
INSERT INTO Requests_IT_Support (ticket_number, team_number)
VALUES (20220005, 5);

INSERT INTO Dept_Located_In (dept_name, building)
VALUES ('Computer Science', 'ICCS');
INSERT INTO Dept_Located_In (dept_name, building)
VALUES ('Computer Science', 'DMP');
INSERT INTO Dept_Located_In (dept_name, building)
VALUES ('Psychology', 'KENN');
INSERT INTO Dept_Located_In (dept_name, building)
VALUES ('Physics', 'HENN');
INSERT INTO Dept_Located_In (dept_name, building)
VALUES ('Economics', 'DMP');
INSERT INTO Dept_Located_In (dept_name, building)
VALUES ('Philosophy', 'BUCH');

INSERT INTO Lab (lab_name, phone_number, homepage_url, email)
VALUES ('ASAP Lab', '6043829482', 'asap.psych.ubc.ca', 'asap@psych.ubc.ca');
INSERT INTO Lab (lab_name, phone_number, homepage_url, email)
VALUES ('Behavioural Lab', '6044318392', 'zhaolab.psych.ubc.ca', 'zhao@psych.ubc.ca');
INSERT INTO Lab (lab_name, phone_number, homepage_url, email)
VALUES ('Computer Vision Lab', '6048229382', 'vision.cs.ubc.ca', 'vision@cs.ubc.ca');
INSERT INTO Lab (lab_name, phone_number, homepage_url, email)
VALUES ('Visual Cognition Lab', '6048229302', 'viscoglab.psych.ubc.ca', 'viscog@psych.ubc.ca');
INSERT INTO Lab (lab_name, phone_number, homepage_url, email)
VALUES ('Algorithms Lab', '6044839283', 'cs.ubc.ca/labs/algorithms', 'algorithm@cs.ubc.ca');

INSERT INTO Participates_In (user_id, lab_name, position)
VALUES (30515167, 'ASAP Lab', 'Primary Investigator');
INSERT INTO Participates_In (user_id, lab_name, position)
VALUES (30515167, 'Behavioural Lab', 'Primary Investigator');
INSERT INTO Participates_In (user_id, lab_name, position)
VALUES (22451884, 'Computer Vision Lab', 'Primary Investigator');
INSERT INTO Participates_In (user_id, lab_name, position)
VALUES (91621482, 'Visual Cognition Lab', 'Primary Investigator');
INSERT INTO Participates_In (user_id, lab_name, position)
VALUES (91621482, 'Algorithms Lab', 'Primary Investigator');
INSERT INTO Participates_In (user_id, lab_name, position)
VALUES (12345678, 'ASAP Lab', 'Research Assistant');
INSERT INTO Participates_In (user_id, lab_name, position)
VALUES (74723029, 'Computer Vision Lab', 'Research Assistant');

INSERT INTO Lab_Located_In (lab_name, room_number, building_code)
VALUES ('ASAP Lab', 210, 'KENN');
INSERT INTO Lab_Located_In (lab_name, room_number, building_code)
VALUES ('Behavioural Lab', 201, 'BUCH');
INSERT INTO Lab_Located_In (lab_name, room_number, building_code)
VALUES ('Computer Vision Lab', 350, 'ICCS');
INSERT INTO Lab_Located_In (lab_name, room_number, building_code)
VALUES ('Visual Cognition Lab', 210, 'DMP');
INSERT INTO Lab_Located_In (lab_name, room_number, building_code)
VALUES ('Algorithms Lab', 200, 'HENN');

INSERT INTO Contributes_To (lab_name, dept_name)
VALUES ('ASAP Lab', 'Psychology');
INSERT INTO Contributes_To (lab_name, dept_name)
VALUES ('Behavioural Lab', 'Psychology');
INSERT INTO Contributes_To (lab_name, dept_name)
VALUES ('Computer Vision Lab', 'Computer Science');
INSERT INTO Contributes_To (lab_name, dept_name)
VALUES ('Visual Cognition Lab', 'Computer Science');
INSERT INTO Contributes_To (lab_name, dept_name)
VALUES ('Visual Cognition Lab', 'Psychology');
INSERT INTO Contributes_To (lab_name, dept_name)
VALUES ('Algorithms Lab', 'Computer Science');
INSERT INTO Contributes_To (lab_name, dept_name)
VALUES ('Algorithms Lab', 'Physics');