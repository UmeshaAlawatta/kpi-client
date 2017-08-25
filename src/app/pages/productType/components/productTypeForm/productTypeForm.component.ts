import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../../../services/shared.service';
import { ProductTypeService } from "../../productType.service";

@Component({
    selector: 'product-type-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./productTypeForm.scss'],
    templateUrl: './productTypeForm.html',
})
export class ProductTypeForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    productType: any;
    subscription: Subscription;

    constructor(protected service: ProductTypeService,
        private route: ActivatedRoute,
        private router: Router,
        fb: FormBuilder,
        private sharedService: SharedService) {
        this.formGroup = fb.group({
            id: '',
            code: ['', Validators.required],
            description: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe(
            (params: Params) => {
                let id = params['id'];
                id = id == undefined ? '0' : id;
                if (id != '0') {
                    this.service.getOne(+id).subscribe(
                        (data) => {
                            this.loadForm(data);
                        }
                    )
                }
            }
        );
    }

    loadForm(data: any) {
        if (data == null) {
            this.productType = data;
        }
        this.formGroup.patchValue(this.productType, { onlySelf: true });
        this.productType = this.productType.productType;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).subscribe(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/productType/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}