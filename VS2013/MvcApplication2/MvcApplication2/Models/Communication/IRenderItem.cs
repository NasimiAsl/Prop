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
    /// <summary>
    /// 
    ///      Represent an intermediate class Render Item.
    ///      Used in the MVC Dynamic Object Render
    ///     
    /// </summary>
    public interface IRenderItem
    {
        /// <summary>
        /// 
        ///    property For shared Viewmodel between main object and Dynamic HtmlUIElement (partial ,action, content) 
        /// 
        /// </summary>
        object ViewModel { get; set; }
    }
}
