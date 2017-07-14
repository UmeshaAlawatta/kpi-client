import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { LabourSourceService } from '../../../../services/labourSource.service';
import { SharedService } from '../../../../services/shared.service';

@Component({
    selector: 'labour-source-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./labourSourceForm.scss'],
    templateUrl: './labourSourceForm.html',
})
export class LabourSourceForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    labourSource: any = {};
    subscription: Subscription;

    constructor(protected service: LabourSourceService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            name: ['', Validators.required]
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
            data.labourSourceTime = new Date(data.labourSourceTime);
            data.recoveryTime = new Date(data.recoveryTime);
            this.labourSource = data;
        }
        this.formGroup.patchValue(this.labourSource, { onlySelf: true });
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/labourSource/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}