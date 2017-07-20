import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { CurrencyService } from '../../../../services/currency.service';
import { SharedService } from '../../../../services/shared.service';

@Component({
    selector: 'currency-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./currencyForm.scss'],
    templateUrl: './currencyForm.html',
})
export class CurrencyForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    currency: any = {};
    subscription: Subscription;

    currencyTypes: any;
    paints: any;

    currencyDate: Date;
    currencyTime: Date = new Date();
    recoveryTime: Date = new Date();
    currencyType: any = { id: '', code: '', type: '' }
    paint: any = { id: '', code: '', description: '' }


    constructor(protected service: CurrencyService,
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
            data.currencyTime = new Date(data.currencyTime);
            data.recoveryTime = new Date(data.recoveryTime);
            this.currency = data;
        }
        this.formGroup.patchValue(this.currency, { onlySelf: true });
        this.currencyType = this.currency.currencyType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/currency/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}