import {AlarmClockService} from './alarm-clock.service';
import { Component, OnInit } from '@angular/core';
import { AlarmClock } from './alarm-clock';

@Component({
    selector: 'app-alarm-clock',
    templateUrl: './alarm-clock.component.html',
    styleUrls: ['./alarm-clock.component.css']
})
export class AlarmClockComponent implements OnInit {

    alarmclocks: Array<AlarmClock> = [];

    modalConfirmDeleteAlarmClockIsVisible: Boolean = false;
    message: String;
    alarmClockToDelete: AlarmClock;

    constructor(
        private alarmClockService: AlarmClockService
    ) { }

    ngOnInit(): void {
        this.refreshAlarmClockList();
    }

    deleteAlarmClock(alarmclock): void {
        // console.log(alarmclock)
        this.alarmClockService.deleteAlarmClockById(alarmclock.id)
        .subscribe(success => this.refreshAlarmClockList(),
            error => console.log(`'error: ${error}`));

    }

    confirmDeleteAlarmClock(alarmclock: AlarmClock): void {
        console.log('confirmDeleteAlarmClock clicked');
        this.modalConfirmDeleteAlarmClockIsVisible = true;
        this.alarmClockToDelete = alarmclock;
        this.message = `Are you sure you want to delete the alarm "${this.alarmClockToDelete.name}"`
    }

    onConfirm(agreed: boolean): void {
        this.modalConfirmDeleteAlarmClockIsVisible = false;
        if (agreed) {
            this.deleteAlarmClock(this.alarmClockToDelete);
        }
    }

    setAlarmClocks(alarmclocks: Array<AlarmClock>): void {
        this.alarmclocks = alarmclocks;
    }

    refreshAlarmClockList(): void {
        this.alarmClockService.getAllAlarmClocks()
        .subscribe(this.setAlarmClocks.bind(this));
    }

    /**
     * Switch the status of the target AlarmClock. If the alarm is active, then switch to inactive and vice versa
     *
     */
    switchActiveAlarmClock(alarmclock: AlarmClock): void {
        alarmclock.is_active = alarmclock.is_active ? false : true;
        // update the AlarmClock
        this.alarmClockService.updateAlarmClockById(alarmclock.id, alarmclock)
        .subscribe(
            success => {
                this.refreshAlarmClockList();
            },
            error => console.log(`Error ${error}`)
        );
    }

}
