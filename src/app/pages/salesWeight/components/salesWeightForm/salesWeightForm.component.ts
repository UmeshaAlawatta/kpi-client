import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { SalesWeightService } from '../../../../services/salesWeight.service';
import { SharedService } from '../../../../services/shared.service';
import { LabourSourceService } from '../../../../services/labourSource.service';

@Component({
    selector: 'sales-weight-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./salesWeightForm.scss'],
    templateUrl: './salesWeightForm.html',
})
export class SalesWeightForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    salesWeight: any = {};
    subscription: Subscription;


    effectiveMonth: Date;
    labourSource: any = { id: '', code: '' }


    constructor(protected service: SalesWeightService, private route: ActivatedRoute, private router: Router, fb: FormBuilder, private sharedService: SharedService, private labourSourceService: LabourSourceService) {
        this.formGroup = fb.group({
            id: '',
            effectiveMonth: [this.effectiveMonth, Validators.required],
            budget: ['', Validators.required],
            actual: ['', Validators.required],
        });
    }


    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.getOne(+id).then(
                        (data) => {
                            this.loadForm(data);
                        }
                    )
                }
            }
        );
    }

    loadForm(data: any) {
        if (data != null) {
            data.effectiveMonth = new Date(data.effectiveMonth);
            this.salesWeight = data;
        }
        this.formGroup.patchValue(this.salesWeight, { onlySelf: true });
        this.labourSource = this.salesWeight.labourSource;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/salesWeight/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}