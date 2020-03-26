import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LayoutModule} from '../layout.module';
import {SidebarComponent} from './sidebar.component';
import {Component, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {SidebarItemComponent} from './sidebar-item';
import {SidebarCollapseDirective} from './sidebar-collapse';

describe('SidebarComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let debugEl: DebugElement;

  let sidebarComponent: SidebarComponent;
  let sidebarDebugEl: DebugElement;
  let sidebarElement: HTMLElement;

  let itemDebugEls: DebugElement[];
  let itemComponents: SidebarItemComponent[];
  let itemElements: HTMLElement[];

  let collapseDebugEl: DebugElement;
  let collapseComponent: SidebarCollapseDirective;
  let collapseElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayoutModule],
      declarations: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    debugEl = fixture.debugElement;
    testComponent = fixture.componentInstance;

    sidebarDebugEl = fixture.debugElement.query(By.directive(SidebarComponent));
    sidebarComponent = sidebarDebugEl.componentInstance;
    sidebarElement = sidebarDebugEl.nativeElement;

    itemDebugEls = sidebarDebugEl.queryAll(By.directive(SidebarItemComponent));
    itemComponents = itemDebugEls.map(i => i.componentInstance);
    itemElements = itemDebugEls.map(i => i.nativeElement);

    collapseDebugEl = sidebarDebugEl.query(By.directive(SidebarCollapseDirective));
    collapseComponent = collapseDebugEl.componentInstance;
    collapseElement = collapseDebugEl.nativeElement;
  });

  it('Is Created', () => {
    expect(sidebarElement.classList.contains('app-sidebar'));
    expect(collapseElement.classList.contains('app-sidebar-collapse-button'));

    expect(itemElements.every(i => i.classList.contains('app-sidebar-item')));
    expect(itemComponents.length).toBe(4);
    expect(itemElements.length).toBe(4);
  });

  it('Set sidebar collapse to true', () => {
    sidebarComponent.collapsed = true;
    fixture.detectChanges();

    expect(sidebarComponent.collapsed).toBe(true);
    expect(sidebarElement.classList.contains('app-sidebar-collapse')).toBeTruthy();
  });

  it('Set sidebar collapse to false', () => {
    sidebarComponent.collapsed = true;
    fixture.detectChanges();

    sidebarComponent.collapsed = false;
    fixture.detectChanges();

    expect(sidebarComponent.collapsed).toBe(false);
    expect(sidebarElement.classList.contains('app-sidebar-collapse')).toBeFalsy();
  });


  it('Click to collapseButton should toggle collapse state', () => {
    collapseElement.click();
    fixture.detectChanges();

    expect(sidebarComponent.collapsed).toBe(true);
    expect(sidebarElement.classList.contains('app-sidebar-collapse')).toBeTruthy();

    collapseElement.click();
    fixture.detectChanges();
    expect(sidebarComponent.collapsed).toBe(false);
    expect(sidebarElement.classList.contains('app-sidebar-collapse')).toBeFalsy();
  });
});

@Component({
  template: `
      <app-sidebar>
          <i MsfIcon appSidebarCollapse iconName="GlobalNavButton"></i>
          <app-sidebar-item icon="Add">Item1</app-sidebar-item>
          <app-sidebar-item icon="Add">Item1</app-sidebar-item>
          <app-sidebar-item icon="Add">Item1</app-sidebar-item>
          <app-sidebar-item icon="Add">Item1</app-sidebar-item>
      </app-sidebar>`
})
export class TestComponent {
}
