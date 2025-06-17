package com.iospopupmenu

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.IosPopupMenuViewManagerInterface
import com.facebook.react.viewmanagers.IosPopupMenuViewManagerDelegate

@ReactModule(name = IosPopupMenuViewManager.NAME)
class IosPopupMenuViewManager : SimpleViewManager<IosPopupMenuView>(),
  IosPopupMenuViewManagerInterface<IosPopupMenuView> {
  private val mDelegate: ViewManagerDelegate<IosPopupMenuView>

  init {
    mDelegate = IosPopupMenuViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<IosPopupMenuView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): IosPopupMenuView {
    return IosPopupMenuView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: IosPopupMenuView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "IosPopupMenuView"
  }
}
