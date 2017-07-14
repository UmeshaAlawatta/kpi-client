import { Component, ViewEncapsulation, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


import { ToolBreakdownService } from '../../../../services/toolBreakdown.service';
import { SharedService } from '../../../../services/shared.service';
import { ToolService } from '../../../../services/tool.service';

@Component({
    selector: 'tool-breakdown-form',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./toolBreakdownForm.scss'],
    templateUrl: './toolBreakdownForm.html',
})
export class ToolBreakdownForm {
    JSON: any = JSON;

    public formGroup: FormGroup;
    toolBreakdown: any = {};
    subscription: Subscription;

    tools: any;

    toolBreakdownDate: Date;
    toolBreakdownTime: Date = new Date();
    recoveryTime: Date = new Date();
    tool: any = { id: '', code: '' }


    constructor(protected service: ToolBreakdownService, private route: ActivatedRoute, private router: Router, fb: FormBuilder, private sharedService: SharedService, private toolService: ToolService) {
        this.formGroup = fb.group({
            id: '',
            toolBreakdownTime: [this.toolBreakdownTime, Validators.required],
            recoveryTime: [this.recoveryTime, Validators.required],
            toolBreakdownNumber: ['', Validators.required],
            tool: [this.tool, Validators.required],
            description: ['', Validators.required]
        });
    }

    getTools(): void {
        this.toolService.getAll().then(tools => this.tools = tools);
    }

    ngOnInit(): void {
        this.getTools();
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
            data.toolBreakdownTime = new Date(data.toolBreakdownTime);
            data.recoveryTime = new Date(data.recoveryTime);
            this.toolBreakdown = data;
        }
        this.formGroup.patchValue(this.toolBreakdown, { onlySelf: true });
        this.tool = this.toolBreakdown.tool;
    }

    public onSubmit(values: any, event: Event): void {
        event.preventDefault();
        console.log(values);
        this.service.save(values).then(
            (data) => {
                this.sharedService.addMessage({ severity: 'info', summary: 'Success', detail: 'Operation Success' });
                this.resetForm();
                this.router.navigate(['/pages/toolBreakdown/form/']);
            }
        );
    }

    public resetForm() {
        this.formGroup.reset();
    }

}