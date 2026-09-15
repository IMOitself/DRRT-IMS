# DRRT-IMS
# live website [drrt-ims.web.app](https://drrt-ims.web.app/)

<details><summary>quick links and stuff</summary>
  
`developer only access :>`
- https://console.firebase.google.com/u/1/project/drrt-ims
- https://dashboard.render.com/web/srv-dah5q2ijnfac738e7p6g/
- https://supabase.com/dashboard/project/pnvqgbxrfxbrvbonwrrb

</details>

<br><br>

> [!NOTE]
> current progress:<br>
> (screenshot is outdated, check the trello link directly)
> <img width="1850" height="762" alt="Screenshot 2026-09-14 132137" src="https://github.com/user-attachments/assets/7e578a8e-802d-4a54-803a-bbccca3d730d" />
> https://trello.com/b/rcb0FEpP


## installation
```
cd frontend
npm install
```
```
cd backend
composer setup
```
to run, open 2 terminals:<br> *(normally these will be open automatically opened on start of ur IDE)*

terminal 1
```
cd frontend
npm run dev
```
terminal 2
```
cd backend
php artisan serve 
```
ctrl + click the link on frontend. goodluck :D

<br><br>

## essential stuff for development
the stuffs are placed here to make it faster to view. <br>
might be outdated, view the [docs](https://docs.google.com/document/d/1ITqkJaaK1XKY5Td46PzvDUZHkkc6rVnZNlhvShZtH2Y/edit?usp=sharing) 
<details>
<summary>ui designs</summary>

### [figma](https://www.figma.com/proto/cXKbJkVcVyjgO4n7lHXyyY/DRRT-PROTOTYPE?node-id=86-1478&t=gx2O0FedSpD7iMKI-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=86%3A1872&show-proto-sidebar=1)

### [ui design html codes](https://github.com/IMOitself/DRRT-IMS-ui-designs)

below are the links to the ui designs that u can actually view live. designed by @m3l-3m.<br>
status: 🟩 (done) | ⬜ (not yet done)

### public
| preview | translated | functional | fixes | code |
| :--- | :---: | :---: | :---: | :--- |
| [events page](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/1student%20(landing%20page)/public_events_preparedness_bulletins.html) | 🟩 | ⬜ | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/1student%20(landing%20page)/public_events_preparedness_bulletins.html) |
| [home page](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/1student%20(landing%20page)/public_home_preparedness_landing_page.html) | 🟩 | 🟩 | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/1student%20(landing%20page)/public_home_preparedness_landing_page.html) |
| [join drrt page](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/1student%20(landing%20page)/join_drrt_membership_information.html) | 🟩 | 🟩 | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/1student%20(landing%20page)/join_drrt_membership_information.html) |
| [application form page](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/1student%20(landing%20page)/application_form.html) | 🟩 | 🟩 | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/1student%20(landing%20page)/application_form.html) |
| [application form status page](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/1student%20(landing%20page)/application_form_submitted.html) | 🟩 | 🟩 | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/1student%20(landing%20page)/application_form_submitted.html) |

### login and register
| preview | translated | functional | fixes | code |
| :--- | :---: | :---: | :---: | :--- |
| [login](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/0login%20register/login.html) | 🟩 | 🟩 | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/0login%20register/login.html) |
| [password reset step 1](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/0login%20register/password%20reset%20step%201.html) | ⬜ | ⬜ | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/0login%20register/password%20reset%20step%201.html) |
| [password reset step 2](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/0login%20register/password%20reset%20step%202.html) | ⬜ | ⬜ | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/0login%20register/password%20reset%20step%202.html) |
| [password reset step 3](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/0login%20register/password%20reset%20step%203.html) | ⬜ | ⬜ | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/0login%20register/password%20reset%20step%203.html) |
| [register](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/0login%20register/register.html) | 🟩 | 🟩 | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/0login%20register/register.html) |

### member role
| preview | translated | functional | fixes | code |
| :--- | :---: | :---: | :---: | :--- |
| [announcements](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/2member/announcements.html) | 🟩 | ⬜ | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/2member/announcements.html) |
| [member_dashboard_updated](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/2member/member_dashboard_updated.html) | 🟩 | 🟩 | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/2member/member_dashboard_updated.html) |
| [my_attendance_records](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/2member/my_attendance_records.html) | 🟩 | ⬜ | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/2member/my_attendance_records.html) |
| [my_digital_id_updated](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/2member/my_digital_id_updated.html) | 🟩 | ⬜ | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/2member/my_digital_id_updated.html) |

### officer role
| preview | translated | functional | fixes | code |
| :--- | :---: | :---: | :---: | :--- |
| [incident_vault](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/3officer/incident_vault.html) | 🟩 | ⬜ | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/3officer/incident_vault.html) |
| [manual_attendance_logger_pro](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/3officer/manual_attendance_logger_pro.html) | 🟩 | ⬜ | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/3officer/manual_attendance_logger_pro.html) |
| [member roster](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/3officer/member_roster.html) | 🟩 | ⬜ | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/3officer/member_roster.html) |
| [new_incident_report_workspace](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/3officer/new_incident_report_workspace.html) | 🟩 | ⬜ | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/3officer/new_incident_report_workspace.html) |
| [officer_dashboard](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/3officer/officer_dashboard.html) | 🟩 | ⬜ | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/3officer/officer_dashboard.html) |

### adviser role
| preview | translated | functional | fixes | code |
| :--- | :---: | :---: | :---: | :--- |
| [approvals_activity_requests](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/4adviser/approvals_activity_requests.html) | ⬜ | ⬜ | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/4adviser/approvals_activity_requests.html) |
| [bylaw_governance_roster_audit](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/4adviser/bylaw_governance_roster_audit.html) | 🟩 | ⬜ | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/4adviser/bylaw_governance_roster_audit.html) |
| [executive_dashboard](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/4adviser/executive_dashboard.html) | 🟩 | ⬜ | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/4adviser/executive_dashboard.html) |
| [executive_reports_hub](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/4adviser/executive_reports_hub.html) | 🟩 | ⬜ | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/4adviser/executive_reports_hub.html) |
| [incident_audit_vault](http://htmlpreview.github.io/?https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/4adviser/incident_audit_vault.html) | 🟩 | ⬜ | ⬜ | [html](https://github.com/IMOitself/DRRT-IMS-ui-designs/blob/master/4adviser/incident_audit_vault.html) |

### converting into react components
- First, go to [html to jsx](https://transform.tools/html-to-jsx) paste the html file there and convert it to jsx.
- create a file
- then prompt this stuff to ur ai. (obviously replace the `<ur file duh>`):
```
> Convert `<ur file duh>`  into a standard React component:
> for example if its Training.jsx and its related to member role:
> 1. Wrap in `export default function Training()`.
> 2. Remove all `<meta>` tags and inline `<style>` tags.
> 3. Replace the header with `Header` and bottom nav with `BottomNav`. add <WIP/> below header.
> 4. Add `!` to all icon text sizing classes (e.g., `text-[24px]!`).
> 5. Keep it completely static for now.
> 6. Register `<Route path="/member/training" element={<Training />} />` in `@[frontend/src/App.jsx]`.
> 7. Add link to it on `@[frontend/src/components/Header.jsx]`.
> 8. css must be consistent with `@[frontend/src/pages/officer/Attendance.jsx]` or the other pages. meaning most tailwind codes are redundant
> 9. minimal edit.
> 10. only view as few files as possible
> 11. mark it as translated on `@README.md`
```

</details>

<details><summary>diagrams</summary>

### erd
<img width="1164" height="909" alt="group3_designs-1  ERD drawio" src="https://github.com/user-attachments/assets/0e996e50-a437-40b1-bbfb-373b36fda005" />

### class diagram
<img width="1081" height="602" alt="group3_designs-2  Class Diagram drawio" src="https://github.com/user-attachments/assets/20412fa7-9555-49d0-89b1-cef31055d8e2" />

### use case diagram
<img width="932" height="1811" alt="group3_designs-3  Use Case Diagram drawio" src="https://github.com/user-attachments/assets/6a9f9ea0-1eb6-4f3b-8764-a6ec573bff0a" />

### system architecture
<img width="878" height="626" alt="group3_designs-4  System Architecture drawio" src="https://github.com/user-attachments/assets/fe151c83-b734-4a17-a68c-4101d9b715e0" />

### context dfd
<img width="1030" height="596" alt="group3_designs-5  Context DFD drawio" src="https://github.com/user-attachments/assets/00b9de76-7cb1-4516-8ed6-d74793d9ffd8" />

### database schema
<img width="3101" height="1190" alt="group3_designs-6  Database Schema drawio" src="https://github.com/user-attachments/assets/05f55c41-05fe-4d8c-a3ee-2c100807f07b" />

</details>

<details><summary>about</summary>

## **1\. Proposed Title**

* Disaster Response and Rescue Team Information Management System (DRRT-IMS) for the LVCC Apalit Chapter

## **2\. Background of the Organization**

The **Disaster Response and Rescue Team** (DRRT) – LVCC Apalit Chapter is a **student organization(club)** of La Verdad Christian College that promotes **disaster preparedness, emergency response, and community service within the school.** Guided by its mission and objectives, the organization conducts t**raining activities, monitors member participation, responds to emergencies** during school events, and helps strengthen disaster awareness among students. The organization also **maintains records related to membership, attendance, training activities, and incident reports** to support its daily operations and fulfill its responsibilities.

At present, these **records** are managed through a **combination of paper documents, Google Sheets, and Google Drive.** Membership information and training records are **manually encoded** into spreadsheets, while attendance monitoring requires officers to copy information from attendance sheets submitted to the Student Organization Office. I**ncident reports** are documented separately because they contain **confidential information** such as patient details, diagnosis, and treatment records. As the organization continues to manage these records manually, retrieving information, updating member records, and monitoring attendance become t**ime-consuming and repetitive tasks.**

## **3\. Statement of the Problem**

The current record management process of the DRRT LVCC Apalit Chapter presents several operational challenges. Officers spend considerable time manually encoding records into spreadsheets, particularly after school activities where attendance records must be transferred from paper documents. Since r**ecords are stored across different files and platforms**, **retrieving informatio**n and **maintaining updated member records** become difficult. The organization also experiences **duplicate records** and relies on officers to manually identify i**nactive or graduated members** during roster updates.

Attendance monitoring is another challenge because **attendance records** serve as the b**asis for implementing the disciplinary policy** stated in the organization's **bylaws**. The current process requires additional manual work before attendance can be monitored effectively. In addition, incident reports contain sensitive personal and medical information that should only be accessed by a**uthorized personnel**. These records require **proper documentation and secure access** to protect the privacy of students while maintaining accountability during emergency response.

## **4\. Proposed Solution**

This study proposes the development of the **Disaster Response and Rescue Team Information Management System (DRRT-IMS)**, a web-based information management system designed for the LVCC Apalit Chapter. The system will centralize membership records, attendance monitoring, training management, and incident logging within a single platform. It will **reduce repetitive manual encoding**, simplify r**ecord retrieval**, and support **attendance monitoring** based on the organization's **bylaws.**

The proposed system will also implement **role-based access control** to protect confidential incident records by limiting access to authorized officers and advisers. In addition, s**tudents** will be able to access **public information such as hazard maps, DRRT activities, training schedules, and membership information** without exposing sensitive organizational records. By providing a c**entralized and organized platform**, the proposed system aims to improve the efficiency of r**ecord management** while supporting the **daily operations of the organization.**

## **5\. Objectives of the System**

### **General Objective**

To develop a web-based Disaster Response and Rescue Team Information Management System (DRRT-IMS) that centralizes the management of membership, attendance, training activities, and incident records for the LVCC Apalit Chapter.

### **Specific Objectives**

The proposed system aims to:

* Digitize the management of membership records and applications.  
* Improve attendance monitoring based on the organization's attendance policy.  
* Maintain training schedules and participation records in a centralized database.  
* Securely manage incident reports using role-based access control.  
* Provide students with access to public information such as hazard maps, organizational activities, and training announcements.

## **6\. Scope of the System**

The proposed DRRT-IMS will be developed exclusively for the **Disaster Response and Rescue Team of La Verdad Christian College – Apalit Chapter**. The system will manage membership records, attendance, training activities, incident reports, and organizational announcements through a centralized web-based platform. It will also include a campus hazard mapping page and public information for students who are interested in the organization.

The system will implement role-based access control. Officers and the adviser will have access to administrative functions and confidential incident records, while members will only access information relevant to them. Regular students will only be able to view public information and submit membership applications.

The proposed system will **not replace the records maintained by the Student Organization Office.** Instead, it is **intended to support the DRRT chapter** i**n managing its own organizational records** more efficiently.

## **7\. Proposed Features**

| Module | Description |
| ----- | ----- |
| Membership Management | Digital application, member records, active and archived members |
| Attendance Monitoring | Attendance recording and monitoring based on the organization's attendance policy |
| Training Management | Training schedules, registration, and completion records |
| Incident Logging | Secure recording of emergency and first-aid incidents |
| Hazard Mapping | Display of campus hazard locations and emergency information |
| Announcements | Publication of activities, trainings, and organizational updates |
| Reports | Generation of attendance, membership, and incident reports |

## **8\. Expected Users**

| User | Purpose |
| ----- | ----- |
| Students | View public information and apply for membership |
| Members | View their attendance, training records, and announcements |
| Officers | Manage membership, attendance, training, and incident records |
| Adviser | Monitor organizational records and access administrative reports |

## **9\. Expected Benefits**

### **For the DRRT Organization**

* Reduces repetitive manual encoding of records.  
* Improves retrieval of organizational information.  
* Maintains updated membership records.  
* Supports attendance monitoring based on the organization's bylaws.

### **For Officers**

* Reduces administrative workload.  
* Simplifies attendance and membership management.  
* Generates reports more efficiently.

### **For Members**

* Provides easier access to training schedules and announcements.  
* Maintains accurate participation records.

### **For the Adviser**

* Provides centralized access to organizational records.  
* Supports monitoring of organizational activities.

## 

## **10\. Alignment with the Sustainable Development Goals (SDGs)**

* **SDG 3 – Good Health and Well-being** by improving the documentation and management of first-aid and emergency response records during school activities.  
* **SDG 4 – Quality Education** by supporting disaster preparedness, volunteer development, and student participation in safety-related activities.  
* **SDG 16 – Peace, Justice and Strong Institutions** by promoting accountable record management, protecting sensitive information through role-based access, and supporting responsible governance within the organization.

## **11\. Why This Project?**

> The proposed project was identified after examining the current operations of the **DRRT LVCC Apalit Chapter** and discussing its existing workflow with the organization's officers. While the organization actively supports disaster preparedness and emergency response within the school, many of its administrative p**rocesses remain fragmented** **across paper documents, spreadsheets, and cloud storage.** These practices increase the time required to manage records and make it difficult to maintain consistent and secure information. The proposed DRRT-IMS aims to address these operational challenges by **providing a centralized information management system** that supports the organization's existing responsibilities without changing its established procedures.

</details>
