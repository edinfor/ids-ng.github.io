import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild
} from '@angular/core';
import {
  SohoDataGridComponent,
} from '@infor/sohoxi-angular';
import {
  PAGING_COLUMNS,
  PAGING_DATA
} from './datagrid-paging-data';
import { DataGridCustomFormatterService } from './datagrid-custom-formatter.service';

@Component({
  selector: 'soho-datagrid-custom-formatter-service-demo',
  templateUrl: './datagrid-custom-formatter-service.demo.html',
  providers: [ DataGridCustomFormatterService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridCustomFormatterServiceDemoComponent implements AfterViewInit {
  @ViewChild(SohoDataGridComponent) sohoDataGridComponent: SohoDataGridComponent;

  RandomIntegerFormatter = (row, cell, value, column, item, api): string => {
    return this.formatterService.randomIntegerFormatter(row, cell, value, column, item, api);
  }

  constructor(
    private formatterService: DataGridCustomFormatterService
  ) {}

  ngAfterViewInit(): void {
    /**
     * Add a column for the custom formatter
     */
    PAGING_COLUMNS.push({
      id: 'custom-formatter',
      name: 'Custom Formatter',
      field: '',
      formatter: this.RandomIntegerFormatter
    });

    const gridOptions: SohoDataGridOptions = <SohoDataGridOptions> {
      columns: PAGING_COLUMNS,
      dataset: PAGING_DATA,
      selectable: 'single',
      paging: true,
      pagesize: 10,
    };

    this.sohoDataGridComponent.gridOptions = gridOptions;
  }
}