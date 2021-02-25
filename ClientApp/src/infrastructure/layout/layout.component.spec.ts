import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LayoutModule} from './layout.module';
import {LayoutComponent} from './layout.component';
import {Component, DebugElement} from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {SidebarCollapseDirective} from './sidebar/sidebar-collapse';
import {By} from '@angular/platform-browser';
import {SidebarItemComponent} from './sidebar/sidebar-item';

describe('LayoutComponent', () => {

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let element: HTMLElement;

  let layoutDebugEl: DebugElement;
  let layoutComponent: LayoutComponent;
  let layoutElement: HTMLElement;

  let layoutMainElement: HTMLElement;


  let sidebarComponent: SidebarComponent;
  let sidebarDebugEl: DebugElement;
  let sidebarElement: HTMLElement;

  let collapseDebugEl: DebugElement;
  let collapseComponent: SidebarCollapseDirective;
  let collapseElement: HTMLElement;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayoutModule],
      declarations: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    component = fixture.componentInstance;
    element = fixture.elementRef.nativeElement;

    layoutDebugEl = fixture.debugElement.query(By.directive(LayoutComponent));
    layoutComponent = layoutDebugEl.componentInstance;
    layoutElement = layoutDebugEl.nativeElement;
    layoutMainElement = layoutComponent.mainContent.nativeElement;

    sidebarDebugEl = layoutDebugEl.query(By.directive(SidebarComponent));
    sidebarComponent = sidebarDebugEl.componentInstance;
    sidebarElement = sidebarDebugEl.nativeElement;


    collapseDebugEl = sidebarDebugEl.query(By.directive(SidebarCollapseDirective));
    collapseComponent = collapseDebugEl.componentInstance;
    collapseElement = collapseDebugEl.nativeElement;
  });

  it('Is defined', () => {
    expect(layoutComponent).toBeDefined();
    expect(layoutElement.classList.contains('app-layout')).toBeTruthy();
    expect(layoutElement.classList.contains('app-layout-withSidebar')).toBeTruthy();
    expect(sidebarElement.classList.contains('layout-sidebar')).toBeTruthy();
    expect(layoutMainElement.classList.contains('layout-main')).toBeTruthy();
  });

  it('Layout without sidebar should not have app-layout-withSidebar class', () => {

    component.sidebar = false;
    fixture.detectChanges();
    expect(layoutElement.classList.contains('app-layout-withSidebar')).toBeFalsy();
  });

  it('Collapse sidebar should expand mainElement', () => {
    expect(layoutElement.classList.contains('app-layout-withCollapsedSidebar')).toBeFalsy();
    collapseElement.click();
    fixture.detectChanges();

    // @ts-ignore
    expect(layoutElement.classList.contains('app-layout-withCollapsedSidebar')).toBeTruthy();
  });
});

@Component({
  template: `
      <app-layout>
          <app-sidebar *ngIf="sidebar">
              <i appSidebarCollapse class="ms-Icon ms-Icon--GlobalNavButton"></i>
              <app-sidebar-item icon="Add">Item1</app-sidebar-item>
          </app-sidebar>

          <div id="content">
              content
          </div>
      </app-layout>
  `
})
class TestComponent {
  sidebar = true;
}
