/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {
  animate,
  animateChild,
  AnimationTriggerMetadata,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

/**
 * The following are all the animations for the mat-select component, with each
 * const containing the metadata for one animation.
 *
 * The values below match the implementation of the AngularJS Material mat-select animation.
 * @docs-private
 */
export const msfPickerAnimations: {
  readonly transformPanelWrap: AnimationTriggerMetadata;
  readonly transformPanel: AnimationTriggerMetadata;
  readonly fadeInContent: AnimationTriggerMetadata;
} = {
  /**
   * This animation ensures the select's overlay panel animation (transformPanel) is called when
   * closing the select.
   * This is needed due to https://github.com/angular/angular/issues/23302
   */
  transformPanelWrap: trigger('transformPanelWrap', [
    transition('* => void', query('@transformPanel', [animateChild()],
      {optional: true}))
  ]),

  /**
   * This animation transforms the select's overlay panel on and off the page.
   *
   * When the panel is attached to the DOM, it expands its width by the amount of padding, scales it
   * up to 100% on the Y axis, fades in its border, and translates slightly up and to the
   * side to ensure the option text correctly overlaps the trigger text.
   *
   * When the panel is removed from the DOM, it simply fades out linearly.
   */
  transformPanel: trigger('transformPanel', [
      state('void', style({
        transform: 'translate3d(0, -48px, 0)',
        opacity: 0
      })),
      state('showing', style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
      })),
      transition('void => *', animate('200ms cubic-bezier(0, 0, 0.2, 1)')),
      transition('* => void', animate('200ms 25ms linear', style({opacity: 0, transform: 'translate3d(0, -48px, 0)'})))
    ]
  ),

  /**
   * This animation fades in the background color and text content of the
   * select's options. It is time delayed to occur 100ms after the overlay
   * panel has transformed in.
   * @deprecated Not used anymore. To be removed.
   * @breaking-change 8.0.0
   */
  fadeInContent: trigger('fadeInContent', [
    state('showing', style({opacity: 1})),
    transition('void => showing', [
      style({opacity: 0}),
      animate('150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)')
    ])
  ])
};


/**
 * @deprecated
 * @breaking-change 8.0.0
 * @docs-private
 */
export const transformPanel = msfPickerAnimations.transformPanel;

/**
 * @deprecated
 * @breaking-change 8.0.0
 * @docs-private
 */
export const fadeInContent = msfPickerAnimations.fadeInContent;
