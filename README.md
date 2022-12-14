# IT Help Desk Model
### Group Members
Andy Shen, Eric Hsieh, Serdar Hasan

NOTE: Serdar has commits with two accounts
### Project Mentor
Jean
## What it does
The project models an IT help desk at a university. It encapsulates students, staff, and faculty from a variety of departments. Each of these users must be part of a lab group in order to use the help desk. Any lab must have members associated with at least one department and therefore contribute to that department. Users can hold different positions in different labs (ie. primary investigator, consultant, research assistant).
Any user can submit a ticket to the help desk to reserve an asset or request IT support. The help desk receives tickets and will reserve and lend any requested assets or support. Assets are defined as any of the following: software licenses, hardware, lab equipment, electronics, and tools. Assets available for use at any help desk were purchased by the department to which the help desk belongs. Departments have an annual budget that limits how much they can spend on purchasing assets. Labs have annual fundings, which is limited by their Department’s annual budget.

Departments and labs are located in buildings, and this information must be made available to the user. Labs are located in specific rooms, which are identifiable only by room number and building code. A help desk must also be located in only one room.

IT support teams are also available from help desks. These teams are responsible for the repairs and maintenance required on any department assets.

## Set Up
- Node.js
- bootstrap (npm install -save bootstrap)
- React Router (npm install react-router-dom)

If error occurs during server startup, run:
- set NODE_OPTIONS=--openssl-legacy-provider

## Model
### Relational Model
Key: <u>primary key</u>, **unique**, *not null*

1. Help_Desk(<u>hid</u>, phone_number, **room_number**, building_code)

2. Faculty_Member(<u>user_id</u>, full_name, admin_access)

3. Department(<u>dept_name</u>, budget, *dept_head*, ***hid***)

4. Lab(<u>lab_name</u>, phone_number, homepage_url, email)

5. Ticket(<u>ticket_number</u>, status, date_created, date_resolved, submitted_by)

6. Purchased_Asset(<u>inv_number</u>, cost, *name*, model, *dept*)

7. Software_License(<u>inv_number</u>, license_code)

8. Hardware(<u>inv_number</u>, type, specification)

9. Electronics(<u>inv_number</u>, wattage, serial_number)

10. IT_Support(<u>team_number</u>, phone_number)

11. Building(<u>building_code</u>, building_name, address)

12. Room(<u>room_number, building_code</u>, floor)

13. Reserves_Asset(<u>ticket_number, inv_number</u>)

14. Requests_IT_Support(<u>ticket_number, team_number</u>)

15. Dept_Located_In(<u>dept_name, building</u>)

16. Lab_Located_In(<u>lab_name, room_number</u>)

17. Participates_In(<u>user_id, lab_name</u>, position)

18. Contributes_To(<u>lab_name, dept_name</u>)

19. Repairs_And_Maintains(<u>team_number, inv_number</u>)

## Timeline

### Nov 11:
- Finalize sketched draft for website
- Set up Oracle database and simple PHP commands to interface
- Create empty SQL tables

### Nov 18:
- Create Login Page
- Create generalized web interface page templates 
- Connect frontend and backend for simple commands
    - New user
    - new ticket
- Populate SQL tables with a few tuples for basic test queries

### Nov 25:
- Full implementation of all SQL relations in backend
- Basic HTML/CSS frontend implementation for following features:
    - Adding a new user
    - Adding a new department
    - Adding new tickets
    - Reserving assets
    - Maintenance requests (directly through front desk or IT department)
- Frontend + backend interfaces connected
- Final debugging for interactions
- Adding nice to have features (visual asthetics)

### Dec:
- Suggestions and changes implemented to finalize bugs/bad design choices


## Task Breakdown

Everyone is doing end-to-end. Specific tasks are:

- Andy: Asset purchasing page
- Serdar: User creation/access
- Eric: Ticket submission

## Architecture and Framework
- Front-end using Bootstrap and REACT.js
- Back-end using PHP and Oracle Database

## To-Do for Interface
- [ ] Add an asset purchase page (assets are classified by subclasses)
- [ ] Add a ticket submission page
- [ ] Add a get department information page
- [ ] Add a user login/access page

## Notes
* `phone_number` attribute is limited to varchar(15) since international standard only supports up to 15 characters
* not sure why there is no underline in markdown but some of the bolded fields are supposed to be underlines instead to indicate primary key
