import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { IncotermService } from '../../incoterm.service';

@Component({
    selector: 'incoterm-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./incotermForm.scss'],
    templateUrl: './incotermForm.html',
})
export class IncotermForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    incoterm: any = {};
    subscription: Subscription;
    incotermType: any;

    constructor(protected service: IncotermService,
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
                    this.service.get(+id).subscribe(
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
            this.incoterm = data;
        }
        this.formGroup.patchValue(this.incoterm, { onlySelf: true });
        this.incotermType = this.incoterm.incotermType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/incoterm/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}
