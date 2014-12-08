//
//         Copyright (c) NiazeRooz.  All rights reserved. 
//
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

//
//      It is maybe Used For any class (View, Partial, ...) then
//      Add To Global System namespace (No Need Add reference in class header...)
// 
namespace System
{
    public class ActionTemplateAttribute : RenderTemplateAttribute
    {
        /// <summary>
        /// 
        ///     Binding Action To Render 
        ///  
        /// </summary>
        /// <param name="actionName"></param>
        /// <param name="controllerName"></param>
        public ActionTemplateAttribute(string actionName, string controllerName)
            : base()
        {
            TemplateValue = (new ActionItem() { ActionName = actionName, ControllerName = controllerName });
        }

        /// <summary>
        /// 
        ///      Binding Action To Render 
        ///      Model Binding in Runtime from RenderItem
        ///      
        /// </summary>
        /// <param name="actionName"></param>
        /// <param name="controllerName"></param>
        /// <param name="area"></param>
        public ActionTemplateAttribute(string actionName, string controllerName, string area)
            : base()
        {
            TemplateValue = (new ActionItem() { ActionName = actionName, ControllerName = controllerName, AreaName = area });
        }
    }
}
