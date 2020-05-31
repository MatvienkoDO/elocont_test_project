import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DataItem } from '../../interfaces/data-item';
import { Column } from '../../interfaces/column';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public readonly columns = columns;

  public items$?: Observable<DataItem[]>;

  constructor(private readonly http: HttpClient) { }

  ngOnInit() {
    this.items$ = this.http.get<DataItem[]>('table-data');
  }

}

const columns: Column[] = [
  { key: 'healthIndex', name: 'Health index' },
  { key: 'endDate', name: 'End date' },
  { key: 'minValueDateTime', name: 'MinValue datetime' },
  { key: 'type', name: 'Type' },
  { key: 'cowId', name: 'Cow id' },
  { key: 'animalId', name: 'Animal id' },
  { key: 'eventId', name: 'Event id' },
  { key: 'deletable', name: 'Deletable' },
  { key: 'lactationNumber', name: 'Lactation number' },
  { key: 'daysInLactation', name: 'Days in lactation' },
  { key: 'ageInDays', name: 'Age in days' },
  { key: 'startDateTime', name: 'Start datetime' },
  { key: 'reportingDateTime', name: 'Reporting datetime' },
  { key: 'alertType', name: 'Alert type' },
  { key: 'duration', name: 'Duration' },
  { key: 'originalStartDateTime', name: 'Original start datetime' },
  { key: 'endDateTime', name: 'End datetime' },
  { key: 'daysInPregnancy', name: 'Days in pregnancy' },
  { key: 'destinationGroup', name: 'Destination group' },
  { key: 'destinationGroupName', name: 'Destination group name' },
  { key: 'calvingEase', name: 'Calving ease' },
  { key: 'oldLactationNumber', name: 'Old lactation number' },
  { key: 'newborns', name: 'Newborns' },
  { key: 'heatIndexPeak', name: 'Heat index peak' },
  { key: 'newGroupId', name: 'New group id' },
  { key: 'newGroupName', name: 'New group name' },
  { key: 'currentGroupId', name: 'Current group id' },
  { key: 'currentGroupName', name: 'Current group name' }
];
