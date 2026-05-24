--
-- PostgreSQL database dump
--

\restrict gEVhteTaDsy4LxLaTsjeWGw5OmhYXalhtpNDxszbpiKngoKXgTumyoiGryQfEjj

-- Dumped from database version 15.17
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.roles VALUES (1, 'leader');
INSERT INTO public.roles VALUES (2, 'member');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'Ahmed Al-Khalid', 'ahmed@test.com', '$2b$10$Gr5QM8jzKTjvWqrPhuYTue9vHLTyq9D89q50gtd92R/hj0/Fnew12', 1, true, '2026-04-20 11:00:39.271161', '2026-04-20 11:00:39.271161');
INSERT INTO public.users VALUES (2, 'Sara Mohammad', 'sara@test.com', '$2b$10$Gr5QM8jzKTjvWqrPhuYTue9vHLTyq9D89q50gtd92R/hj0/Fnew12', 2, true, '2026-04-20 11:00:39.271161', '2026-04-20 11:00:39.271161');
INSERT INTO public.users VALUES (3, 'Omar Abdullah', 'omar@test.com', '$2b$10$Gr5QM8jzKTjvWqrPhuYTue9vHLTyq9D89q50gtd92R/hj0/Fnew12', 2, true, '2026-04-20 11:00:39.271161', '2026-04-20 11:00:39.271161');
INSERT INTO public.users VALUES (4, 'Lina Hassan', 'lina@test.com', '$2b$10$Gr5QM8jzKTjvWqrPhuYTue9vHLTyq9D89q50gtd92R/hj0/Fnew12', 2, true, '2026-04-20 11:00:39.271161', '2026-04-20 11:00:39.271161');
INSERT INTO public.users VALUES (5, 'Khalid Nasser', 'khalid@test.com', '$2b$10$Gr5QM8jzKTjvWqrPhuYTue9vHLTyq9D89q50gtd92R/hj0/Fnew12', 1, true, '2026-04-20 11:00:39.271161', '2026-04-20 11:00:39.271161');
INSERT INTO public.users VALUES (6, 'Test', 'test@test.com', '$2b$10$CkQuPi.DE9JophR/Qav7LeTCBmjnqBryUSznmiXvB2lb6Qy/0ZB6y', 2, true, '2026-04-21 23:05:54.669896', '2026-04-21 23:05:54.669896');
INSERT INTO public.users VALUES (7, 'Test', 'newuser99@test.com', '$2b$10$5bal6Zl07JbL5ryo7LREyOxUFPJDYXhd8VHp5uRIo74FdFQNEr4R.', 2, true, '2026-04-21 23:08:15.172302', '2026-04-21 23:08:15.172302');
INSERT INTO public.users VALUES (8, 'fatima', 'fatima123@gmail.com', '$2b$10$C.73fhR0PoAcGgW8tOdY7OYooXNY3VOK/xOk4cg2f3q/t8JdON7p2', 2, true, '2026-04-21 23:20:43.838661', '2026-04-21 23:20:43.838661');
INSERT INTO public.users VALUES (9, 'fatimajber', 'fatina@test.com', '$2b$10$ODv6gvccBFFoQxFqSUAWkuS91u.y6d1SBfo95O8l67XAlB.uDGOyO', 2, true, '2026-04-21 23:43:07.231978', '2026-04-21 23:43:07.231978');
INSERT INTO public.users VALUES (10, 'fatima', 'fatima@test.com', '$2b$10$tblv46gpU4zaiUQZeFlFYuQ782x.XX6UnmTUwa/G7Kw8d6eCZwrMm', 2, true, '2026-04-22 00:02:17.68465', '2026-04-22 00:02:17.68465');
INSERT INTO public.users VALUES (11, 'fatimajber', 'fa123@test.com', '$2b$10$y1mpA4KSFDHIpIa3e943o.qSk1caUrQGJkMa.7gqP.IP.WaJxmSyG', 2, true, '2026-04-22 01:06:45.89764', '2026-04-22 01:06:45.89764');
INSERT INTO public.users VALUES (12, 'fatima', 'fatoom@test.com', '$2b$10$isi3ydNhPtLfqg2mJDKU9u1vxqsMnh26GhPd3paSNw0jeaUsrjG4u', 1, true, '2026-04-22 01:07:09.216853', '2026-04-22 01:07:09.216853');
INSERT INTO public.users VALUES (13, 'salah jber', 'salah124@gmail.com', '$2b$10$xi36TtpLVq5MdZdq/Fol3Oqk6ov1l5vBE1FvJicRokc2QY.nakWgW', 2, true, '2026-04-22 09:50:17.610131', '2026-04-22 09:50:17.610131');
INSERT INTO public.users VALUES (14, 'sondos', 'sondos@test.com', '$2b$10$i2fk1tac4QrGWiTW/DXmTexHbY/1VItFH5HLakEQ/qsaWtucc4EiO', 2, true, '2026-05-21 12:50:23.08529', '2026-05-21 12:50:23.08529');
INSERT INTO public.users VALUES (15, 'marwa', 'marwa@test.com', '$2b$10$5eqpmI2BwBhxiSAZk8b0Rez./wJN41ZHTZBXKsKWWUNT/DnkKdEA.', 1, true, '2026-05-21 12:51:05.299815', '2026-05-21 12:51:05.299815');


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.projects VALUES (1, 'Smart Project Management', 'Company internal project management system', 1, '2026-03-01', '2026-06-30', 'active', '2026-04-20 11:01:12.853393', '2026-04-20 11:01:12.853393');
INSERT INTO public.projects VALUES (2, 'Mobile App Development', 'Build mobile application for project tracking', 5, '2026-04-01', '2026-07-30', 'active', '2026-04-20 11:01:12.853393', '2026-04-20 11:01:12.853393');
INSERT INTO public.projects VALUES (3, 'c++', 'coding', 1, NULL, NULL, 'active', '2026-04-21 23:39:58.416527', '2026-04-21 23:39:58.416527');
INSERT INTO public.projects VALUES (4, 'java', 'create java code', 1, NULL, NULL, 'active', '2026-04-22 00:33:37.119601', '2026-04-22 00:33:37.119601');
INSERT INTO public.projects VALUES (5, 'c++', 'c++ code', 1, NULL, NULL, 'active', '2026-04-22 10:40:35.686401', '2026-04-22 10:40:35.686401');
INSERT INTO public.projects VALUES (6, 'java', '', 1, NULL, NULL, 'active', '2026-04-22 10:47:11.27626', '2026-04-22 10:47:11.27626');
INSERT INTO public.projects VALUES (7, 'java', '', 1, NULL, NULL, 'active', '2026-04-22 10:47:28.404787', '2026-04-22 10:47:28.404787');
INSERT INTO public.projects VALUES (8, 'c++', 'code of c++
', 1, NULL, NULL, 'active', '2026-04-26 20:12:44.355649', '2026-04-26 20:12:44.355649');
INSERT INTO public.projects VALUES (9, 'math', 'mathmatic', 1, NULL, NULL, 'active', '2026-04-28 20:13:20.507196', '2026-04-28 20:13:20.507196');
INSERT INTO public.projects VALUES (10, 'javascript', 'create a js project', 1, NULL, NULL, 'active', '2026-05-02 08:37:39.508993', '2026-05-02 08:37:39.508993');
INSERT INTO public.projects VALUES (11, 'database3', 'database', 1, NULL, NULL, 'active', '2026-05-17 22:24:51.43936', '2026-05-17 22:24:51.43936');
INSERT INTO public.projects VALUES (12, 'database 2', 'create a database2', 1, NULL, NULL, 'active', '2026-05-21 12:42:32.471402', '2026-05-21 12:42:32.471402');
INSERT INTO public.projects VALUES (13, 'data structure', 'create a  code', 15, NULL, NULL, 'active', '2026-05-21 12:51:48.223873', '2026-05-21 12:51:48.223873');


--
-- Data for Name: task_statuses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.task_statuses VALUES (1, 'not_started');
INSERT INTO public.task_statuses VALUES (2, 'in_progress');
INSERT INTO public.task_statuses VALUES (3, 'completed');


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tasks VALUES (12, 'javascript', 'create a code of js', 10, 1, 3, 3, '2026-12-10 00:00:00', 3, 100.00, NULL, 0.00, '2026-05-02 08:38:17.4483', '2026-05-02 08:38:17.4483', NULL, 'jhhbmnbcjyvkhvd', '2026-05-02 08:42:24.369085', 36, '', '2026-05-02 08:43:11.269963', 'Medium', 'none', '', '', '', NULL);
INSERT INTO public.tasks VALUES (19, 'data', '', 13, 15, 3, 3, '2026-06-02 00:00:00', 3, 100.00, NULL, 0.00, '2026-05-21 12:57:34.742239', '2026-05-21 12:57:34.742239', NULL, 'ok', '2026-05-21 13:00:02.572022', NULL, '', NULL, 'Medium', 'approved', 'thanks', '', '', '2026-05-21 13:00:47.537858');
INSERT INTO public.tasks VALUES (5, 'c++', 'create simple code for c++', 3, 1, 3, 3, '2026-02-08 00:00:00', 3, 100.00, NULL, 0.00, '2026-04-22 00:07:28.672158', '2026-04-22 00:07:28.672158', NULL, 'hncgfc', '2026-05-02 20:34:23.165906', NULL, '', NULL, 'Medium', 'approved', '', '', '', '2026-05-02 20:34:40.617895');
INSERT INTO public.tasks VALUES (14, 'database3', 'create database ', 11, 1, 2, 3, '2026-03-05 00:00:00', 1, 0.00, NULL, 0.00, '2026-05-17 22:26:06.865772', '2026-05-17 22:26:06.865772', NULL, '', NULL, NULL, '', NULL, 'Medium', 'none', '', '', '', NULL);
INSERT INTO public.tasks VALUES (9, 'code', 'write the code', 3, 1, 3, 3, '2026-12-21 00:00:00', 1, 0.00, NULL, 0.00, '2026-04-26 20:28:06.872207', '2026-04-26 20:28:06.872207', NULL, '', NULL, NULL, '', NULL, 'Medium', 'none', '', '', '', NULL);
INSERT INTO public.tasks VALUES (18, 'data sturcture', '', 13, 15, 3, 3, '2027-01-01 00:00:00', 3, 100.00, NULL, 0.00, '2026-05-21 12:57:02.440714', '2026-05-21 12:57:02.440714', NULL, 'write solution', '2026-05-21 12:58:07.535804', NULL, '', NULL, 'High', 'approved', '', '', '', '2026-05-21 12:59:29.36415');
INSERT INTO public.tasks VALUES (8, 'code', '', 5, 1, 4, 3, '2026-02-10 00:00:00', 1, 0.00, NULL, 0.00, '2026-04-22 10:42:34.332414', '2026-04-22 10:42:34.332414', '2026-02-11', '', NULL, NULL, '', NULL, 'Urgent', 'none', '', '', '', NULL);
INSERT INTO public.tasks VALUES (3, 'Setup Mobile Project', 'Initialize mobile app project structure', 2, 5, 2, 3, '2026-04-30 00:00:00', 1, 0.00, NULL, 0.00, '2026-04-20 11:01:12.853393', '2026-04-20 11:01:12.853393', NULL, '', NULL, NULL, '', NULL, 'High', 'none', '', '', '', NULL);
INSERT INTO public.tasks VALUES (1, 'Design Database', 'Create PostgreSQL database schema', 1, 1, 4, 5, '2026-04-29 00:00:00', 3, 100.00, NULL, 0.00, '2026-04-20 11:01:12.853393', '2026-04-20 11:01:12.853393', NULL, 'kbkbygvbk', '2026-05-02 20:33:02.729114', NULL, '', NULL, 'High', 'approved', '', '', '', '2026-05-02 20:33:27.902412');
INSERT INTO public.tasks VALUES (2, 'Build Dashboard UI', 'Implement leader dashboard interface', 1, 1, 3, 4, '2026-05-14 00:00:00', 1, 0.00, NULL, 0.00, '2026-04-20 11:01:12.853393', '2026-04-20 11:01:12.853393', NULL, '', NULL, NULL, '', NULL, 'Low', 'none', '', '', '', NULL);
INSERT INTO public.tasks VALUES (10, 'html ', 'write the cod eof html ,css ', 1, 1, 3, 3, '2026-12-21 00:00:00', 1, 0.00, NULL, 0.00, '2026-04-27 09:29:11.355456', '2026-04-27 09:29:11.355456', NULL, '', NULL, NULL, '', NULL, 'Medium', 'none', '', '', '', NULL);
INSERT INTO public.tasks VALUES (20, 'data', '', 13, 15, 2, 3, '2026-06-04 00:00:00', 3, 100.00, NULL, 0.00, '2026-05-21 13:01:52.981055', '2026-05-21 13:01:52.981055', NULL, 'ok', '2026-05-21 13:03:17.709518', NULL, '', NULL, 'High', 'approved', 'thanks
', '', '', '2026-05-21 13:04:11.838449');
INSERT INTO public.tasks VALUES (17, 'data strcture', '', 13, 15, 3, 3, '2026-06-02 00:00:00', 1, 0.00, NULL, 0.00, '2026-05-21 12:53:54.952673', '2026-05-21 12:53:54.952673', NULL, '', NULL, NULL, '', NULL, 'Medium', 'none', '', '', '', NULL);
INSERT INTO public.tasks VALUES (16, 'data structure', '', 13, 15, 3, 3, '2026-06-03 00:00:00', 3, 100.00, NULL, 0.00, '2026-05-21 12:52:34.411227', '2026-05-21 12:52:34.411227', NULL, 'solu is done', '2026-05-21 12:54:42.319767', NULL, '', NULL, 'Medium', 'approved', 'ok where is done', '', '', '2026-05-21 12:56:12.31474');
INSERT INTO public.tasks VALUES (7, 'c++', 'code', 3, 1, 3, 3, '2026-02-09 00:00:00', 3, 100.00, NULL, 0.00, '2026-04-22 10:33:25.885219', '2026-04-22 10:33:25.885219', '2026-02-11', 'write solu', '2026-05-21 12:38:52.320881', NULL, '', NULL, 'High', 'approved', '', '', '', '2026-05-21 12:41:05.298837');
INSERT INTO public.tasks VALUES (6, 'code java', 'homwork', 4, 1, 2, 3, '2027-02-28 00:00:00', 3, 100.00, NULL, 0.00, '2026-04-22 00:35:15.278725', '2026-04-22 00:35:15.278725', '2026-12-21', 'this is the write solution', '2026-05-21 12:11:52.504124', NULL, '', NULL, 'High', 'approved', '', 'task-6-1779354712426.pdf', 'Smart Project Management System1.pdf', '2026-05-21 12:12:42.307123');
INSERT INTO public.tasks VALUES (15, 'database2', '', 12, 1, 3, 3, '2026-06-08 00:00:00', 1, 0.00, NULL, 0.00, '2026-05-21 12:47:09.114476', '2026-05-21 12:47:09.114476', NULL, '', NULL, NULL, '', NULL, 'Medium', 'none', '', '', '', NULL);
INSERT INTO public.tasks VALUES (4, 'c++homwork', 'create a code of c++', 3, 1, 3, 3, '2026-02-09 00:00:00', 2, 100.00, NULL, 0.00, '2026-04-21 23:41:28.958556', '2026-04-21 23:41:28.958556', NULL, 'jhgujh ', '2026-05-22 15:43:47.993646', NULL, '', NULL, 'Medium', 'needs_revision', 'write again
', '', '', NULL);
INSERT INTO public.tasks VALUES (11, 'database', 'write a database ', 1, 1, 3, 3, '2026-04-05 00:00:00', 3, 100.00, NULL, 0.00, '2026-04-27 10:05:51.496357', '2026-04-27 10:05:51.496357', NULL, 'gfdhgvhgfh', '2026-05-22 15:42:55.578539', NULL, '', NULL, 'Medium', 'approved', 'ok
', '', '', '2026-05-22 15:46:07.669587');


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.notifications VALUES (1, 3, '📌 New Task Assigned: database', 'You have been assigned a new task "database" in project "Smart Project Management". Deadline: 4/6/2026', true, '2026-04-27 10:05:51.560133', NULL);
INSERT INTO public.notifications VALUES (2, 2, '📌 New Task Assigned: javascript', 'You have been assigned a new task "javascript" in project "javascript". Deadline: 12/10/2026', true, '2026-05-02 08:38:17.519805', 12);
INSERT INTO public.notifications VALUES (3, 2, '💪 Task Scored: javascript', 'Your submission for "javascript" received a score of 36/100.', true, '2026-05-02 08:43:11.277238', 12);
INSERT INTO public.notifications VALUES (5, 2, '🔄 Revision Required: Design Database', 'Leader requested revisions: "لاز يتم التعديل عل هاد الملف بالكامل "', true, '2026-05-02 20:08:09.2895', 1);
INSERT INTO public.notifications VALUES (20, 14, 'New Task Assigned: data structure', 'You have been assigned "data structure" in project "data structure". Priority: 🟡 Medium. Deadline: 02/06/2026 Start working now!', true, '2026-05-21 12:52:34.42866', 16);
INSERT INTO public.notifications VALUES (8, 2, '✅ Task Approved: Design Database', 'Great work! "Design Database" was approved. 🎉', true, '2026-05-02 20:33:27.906879', 1);
INSERT INTO public.notifications VALUES (22, 15, 'Task Submitted for Review: data structure', 'A member submitted "data structure" and is awaiting your review. Check the Review tab.', true, '2026-05-21 12:54:42.32844', 16);
INSERT INTO public.notifications VALUES (23, 14, 'Task Approved: data structure', 'Great work! "data structure" was approved.', true, '2026-05-21 12:56:12.326444', 16);
INSERT INTO public.notifications VALUES (4, 1, '📬 Task Submitted for Review: Design Database', 'A member submitted "Design Database" and is awaiting your review. 📎 File: "exchange of project.zip". Check the Review tab.', true, '2026-05-02 20:07:20.581989', 1);
INSERT INTO public.notifications VALUES (7, 1, '📬 Task Submitted for Review: Design Database', 'A member submitted "Design Database" and is awaiting your review. Check the Review tab.', true, '2026-05-02 20:33:02.7331', 1);
INSERT INTO public.notifications VALUES (9, 1, '📬 Task Submitted for Review: c++', 'A member submitted "c++" and is awaiting your review. Check the Review tab.', true, '2026-05-02 20:34:23.169807', 5);
INSERT INTO public.notifications VALUES (10, 2, '✅ Task Approved: c++', 'Great work! "c++" was approved. 🎉', true, '2026-05-02 20:34:40.622697', 5);
INSERT INTO public.notifications VALUES (11, 1, 'Task Submitted for Review: code java', 'A member submitted "code java" and is awaiting your review. File: "Smart Project Management System1.pdf". Check the Review tab.', true, '2026-05-21 12:11:52.513887', 6);
INSERT INTO public.notifications VALUES (13, 1, 'Task Submitted for Review: c++', 'A member submitted "c++" and is awaiting your review. Check the Review tab.', true, '2026-05-21 12:13:25.301954', 7);
INSERT INTO public.notifications VALUES (14, 4, 'Revision Required: c++', 'Leader requested revisions: "write again
"', false, '2026-05-21 12:14:50.279718', 7);
INSERT INTO public.notifications VALUES (12, 3, 'Task Approved: code java', 'Great work! "code java" was approved.', true, '2026-05-21 12:12:42.315177', 6);
INSERT INTO public.notifications VALUES (40, 3, 'Task Approved: database', 'Great work! "database" was approved.', false, '2026-05-22 15:46:07.672933', 11);
INSERT INTO public.notifications VALUES (18, 4, 'Task Approved: c++', 'Great work! "c++" was approved.', false, '2026-05-21 12:41:05.307981', 7);
INSERT INTO public.notifications VALUES (16, 1, 'Task Submitted for Review: c++', 'A member submitted "c++" and is awaiting your review. Check the Review tab.', true, '2026-05-21 12:38:52.326218', 7);
INSERT INTO public.notifications VALUES (19, 11, 'New Task Assigned: database2', 'You have been assigned "database2" in project "database 2". Priority: 🟡 Medium. Deadline: 02/06/2026 Start working now!', false, '2026-05-21 12:47:09.238393', 15);
INSERT INTO public.notifications VALUES (21, 4, 'New Task Assigned: data strcture', 'You have been assigned "data strcture" in project "data structure". Priority: 🟡 Medium. Deadline: 02/06/2026 Start working now!', false, '2026-05-21 12:53:54.967946', 17);
INSERT INTO public.notifications VALUES (24, 3, 'New Task Assigned: data sturcture', 'You have been assigned "data sturcture" in project "data structure". Priority: 🟡 Medium. Deadline: 02/01/2027 Start working now!', true, '2026-05-21 12:57:02.456897', 18);
INSERT INTO public.notifications VALUES (39, 3, 'Revision Required: c++homwork', 'Leader requested revisions: "write again
"', true, '2026-05-22 15:45:55.692639', 4);
INSERT INTO public.notifications VALUES (25, 2, 'New Task Assigned: data', 'You have been assigned "data" in project "data structure". Priority: 🟡 Medium. Deadline: 02/06/2026 Start working now!', true, '2026-05-21 12:57:34.765816', 19);
INSERT INTO public.notifications VALUES (27, 15, 'Task Submitted for Review: data', 'A member submitted "data" and is awaiting your review. Check the Review tab.', true, '2026-05-21 12:58:52.863119', 19);
INSERT INTO public.notifications VALUES (26, 15, 'Task Submitted for Review: data sturcture', 'A member submitted "data sturcture" and is awaiting your review. Check the Review tab.', true, '2026-05-21 12:58:07.544344', 18);
INSERT INTO public.notifications VALUES (29, 2, 'Revision Required: data', 'Leader requested revisions: "write again"', true, '2026-05-21 12:59:44.689703', 19);
INSERT INTO public.notifications VALUES (28, 3, 'Task Approved: data sturcture', 'Great work! "data sturcture" was approved.', true, '2026-05-21 12:59:29.372099', 18);
INSERT INTO public.notifications VALUES (30, 15, 'Task Submitted for Review: data', 'A member submitted "data" and is awaiting your review. Check the Review tab.', true, '2026-05-21 13:00:02.574252', 19);
INSERT INTO public.notifications VALUES (32, 14, 'New Task Assigned: data', 'You have been assigned "data" in project "data structure". Priority: 🟡 Medium. Deadline: 05/06/2026 Start working now!', true, '2026-05-21 13:01:52.994274', 20);
INSERT INTO public.notifications VALUES (33, 15, 'Task Submitted for Review: data', 'A member submitted "data" and is awaiting your review. Check the Review tab.', true, '2026-05-21 13:02:26.845354', 20);
INSERT INTO public.notifications VALUES (34, 14, 'Revision Required: data', 'Leader requested revisions: "write again"', true, '2026-05-21 13:03:00.405389', 20);
INSERT INTO public.notifications VALUES (35, 15, 'Task Submitted for Review: data', 'A member submitted "data" and is awaiting your review. Check the Review tab.', true, '2026-05-21 13:03:17.714439', 20);
INSERT INTO public.notifications VALUES (36, 14, 'Task Approved: data', 'Great work! "data" was approved.', true, '2026-05-21 13:04:11.843796', 20);
INSERT INTO public.notifications VALUES (31, 2, 'Task Approved: data', 'Great work! "data" was approved.', true, '2026-05-21 13:00:47.542167', 19);
INSERT INTO public.notifications VALUES (37, 1, 'Task Submitted for Review: database', 'A member submitted "database" and is awaiting your review. Check the Review tab.', false, '2026-05-22 15:42:55.590513', 11);
INSERT INTO public.notifications VALUES (38, 1, 'Task Submitted for Review: c++homwork', 'A member submitted "c++homwork" and is awaiting your review. Check the Review tab.', false, '2026-05-22 15:43:48.002219', 4);


--
-- Data for Name: performance_snapshots; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: project_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.project_members VALUES (1, 1, 2);
INSERT INTO public.project_members VALUES (2, 1, 3);
INSERT INTO public.project_members VALUES (3, 2, 4);


--
-- Data for Name: task_assignments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.task_assignments VALUES (1, 1, 2, 1, '2026-04-20 11:01:12.853393', true);
INSERT INTO public.task_assignments VALUES (2, 2, 3, 1, '2026-04-20 11:01:12.853393', true);
INSERT INTO public.task_assignments VALUES (3, 3, 4, 5, '2026-04-20 11:01:12.853393', true);
INSERT INTO public.task_assignments VALUES (4, 4, 3, 1, '2026-04-21 23:41:28.969859', true);
INSERT INTO public.task_assignments VALUES (5, 5, 2, 1, '2026-04-22 00:07:28.68118', true);
INSERT INTO public.task_assignments VALUES (6, 6, 3, 1, '2026-04-22 00:35:15.289091', true);
INSERT INTO public.task_assignments VALUES (7, 6, 2, 1, '2026-04-22 00:35:15.292898', true);
INSERT INTO public.task_assignments VALUES (8, 6, 4, 1, '2026-04-22 00:35:15.294791', true);
INSERT INTO public.task_assignments VALUES (9, 7, 4, 1, '2026-04-22 10:33:25.899932', true);
INSERT INTO public.task_assignments VALUES (10, 7, 3, 1, '2026-04-22 10:33:25.903807', true);
INSERT INTO public.task_assignments VALUES (11, 7, 2, 1, '2026-04-22 10:33:25.905342', true);
INSERT INTO public.task_assignments VALUES (12, 8, 10, 1, '2026-04-22 10:42:34.342557', true);
INSERT INTO public.task_assignments VALUES (13, 8, 13, 1, '2026-04-22 10:42:34.34637', true);
INSERT INTO public.task_assignments VALUES (14, 8, 7, 1, '2026-04-22 10:42:34.348021', true);
INSERT INTO public.task_assignments VALUES (15, 9, 13, 1, '2026-04-26 20:28:06.89402', true);
INSERT INTO public.task_assignments VALUES (16, 10, 8, 1, '2026-04-27 09:29:11.37139', true);
INSERT INTO public.task_assignments VALUES (17, 11, 3, 1, '2026-04-27 10:05:51.505285', true);
INSERT INTO public.task_assignments VALUES (18, 12, 2, 1, '2026-05-02 08:38:17.461001', true);
INSERT INTO public.task_assignments VALUES (20, 14, 4, 1, '2026-05-17 22:26:06.878706', true);
INSERT INTO public.task_assignments VALUES (21, 15, 11, 1, '2026-05-21 12:47:09.129345', true);
INSERT INTO public.task_assignments VALUES (22, 16, 14, 15, '2026-05-21 12:52:34.423856', true);
INSERT INTO public.task_assignments VALUES (23, 17, 4, 15, '2026-05-21 12:53:54.963722', true);
INSERT INTO public.task_assignments VALUES (24, 18, 3, 15, '2026-05-21 12:57:02.452453', true);
INSERT INTO public.task_assignments VALUES (25, 19, 2, 15, '2026-05-21 12:57:34.755781', true);
INSERT INTO public.task_assignments VALUES (26, 20, 14, 15, '2026-05-21 13:01:52.990234', true);


--
-- Data for Name: task_files; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: time_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.time_logs VALUES (1, 5, 2, '2026-04-22 00:08:19.78494', NULL, NULL, '2026-04-22 00:08:19.78494');
INSERT INTO public.time_logs VALUES (2, 7, 2, '2026-04-26 21:44:30.683983', NULL, NULL, '2026-04-26 21:44:30.683983');
INSERT INTO public.time_logs VALUES (3, 7, 2, '2026-04-27 09:30:08.513647', NULL, NULL, '2026-04-27 09:30:08.513647');
INSERT INTO public.time_logs VALUES (4, 11, 3, '2026-04-27 10:15:52.974954', NULL, NULL, '2026-04-27 10:15:52.974954');
INSERT INTO public.time_logs VALUES (5, 2, 3, '2026-04-28 20:37:41.901043', NULL, NULL, '2026-04-28 20:37:41.901043');
INSERT INTO public.time_logs VALUES (6, 4, 3, '2026-04-28 20:38:18.609184', NULL, NULL, '2026-04-28 20:38:18.609184');
INSERT INTO public.time_logs VALUES (7, 2, 3, '2026-04-29 10:39:32.8551', NULL, NULL, '2026-04-29 10:39:32.8551');
INSERT INTO public.time_logs VALUES (8, 12, 2, '2026-05-02 08:39:05.156598', NULL, NULL, '2026-05-02 08:39:05.156598');


--
-- Name: notifications_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_notification_id_seq', 40, true);


--
-- Name: performance_snapshots_snapshot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.performance_snapshots_snapshot_id_seq', 1, false);


--
-- Name: project_members_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_members_id_seq', 3, true);


--
-- Name: projects_project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_project_id_seq', 13, true);


--
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 2, true);


--
-- Name: task_assignments_assignment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.task_assignments_assignment_id_seq', 26, true);


--
-- Name: task_files_file_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.task_files_file_id_seq', 1, false);


--
-- Name: task_statuses_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.task_statuses_status_id_seq', 3, true);


--
-- Name: tasks_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_task_id_seq', 20, true);


--
-- Name: time_logs_time_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.time_logs_time_log_id_seq', 8, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 15, true);


--
-- PostgreSQL database dump complete
--

\unrestrict gEVhteTaDsy4LxLaTsjeWGw5OmhYXalhtpNDxszbpiKngoKXgTumyoiGryQfEjj

