import { inject } from "vue";

/**
 * composable thực hiệc cho việc muốn toggle dialog
 * @param {*} stateName (string) tên của state app [{stateName}.dialog.show]
 * @param {*} isClose [bool] flag muốn close hay open [true: close, false: open]
 * @author SONTB
 */
export function useToggleDialog(stateName, isClose) {
  const states = inject(stateName);
  isClose ? (states.dialog.show = false) : (states.dialog.show = true);
}
