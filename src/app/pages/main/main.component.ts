import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DataItem } from '../../interfaces/data-item';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public readonly fields = fields;

  public items$?: Observable<DataItem[]>;

  constructor(private readonly http: HttpClient) { }

  ngOnInit() {
    this.items$ = this.http.get<DataItem[]>('table-data');
  }

}

const fields = [
  'healthIndex',
  'endDate',
  'minValueDateTime',
  'type',
  'cowId',
  'animalId',
  'eventId',
  'deletable',
  'lactationNumber',
  'daysInLactation',
  'ageInDays',
  'startDateTime',
  'reportingDateTime',
  'alertType',
  'duration',
  'originalStartDateTime',
  'endDateTime',
  'daysInPregnancy',
  'destinationGroup',
  'destinationGroupName',
  'calvingEase',
  'oldLactationNumber',
  'newborns',
  'heatIndexPeak',
  'newGroupId',
  'newGroupName',
  'currentGroupId',
  'currentGroupName'
];
