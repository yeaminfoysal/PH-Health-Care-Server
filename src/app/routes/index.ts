import express from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.route';
import { ScheduleRoutes } from '../modules/schedule/schedule.route';
import { doctorScheduleRoutes } from '../modules/doctorSchedule/doctorSchedule.routes';
import { SpecialtiesRoutes } from '../modules/specialities/spacialities.routes';
import { DoctorRoutes } from '../modules/doctor/doctor.routes';
import { AppointmentRoutes } from '../modules/appoinment/appoinment.route';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/schedule',
        route: ScheduleRoutes
    },
    {
        path: '/doctor-schedule',
        route: doctorScheduleRoutes
    },
    {
        path: '/specialties',
        route: SpecialtiesRoutes
    },
    {
        path: '/doctor',
        route: DoctorRoutes
    },
    {
        path: '/appoinment',
        route: AppointmentRoutes
    },
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;