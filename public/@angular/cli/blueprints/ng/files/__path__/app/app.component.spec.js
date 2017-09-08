"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
 % ;
if (routing) {
     %  >
    ;
    import { RouterTestingModule } from '@angular/router/testing';
     % ;
}
 %  >
;
var app_component_1 = require("./app.component");
describe('AppComponent', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({} <  % );
        if (routing) {
             %  >
                imports;
            [
                testing_2.RouterTestingModule
            ],  % ;
        }
         %  >
            declarations;
        [
            app_component_1.AppComponent
        ],
        ;
    }).compileComponents());
});
;
it('should create the app', testing_1.async(function () {
    var fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
    var app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
}));
it("should have as title '<%= prefix %>'", testing_1.async(function () {
    var fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
    var app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('<%= prefix %>');
}));
it('should render title in a h1 tag', testing_1.async(function () {
    var fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
    fixture.detectChanges();
    var compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to <%= prefix %>!');
}));
;
//# sourceMappingURL=app.component.spec.js.map