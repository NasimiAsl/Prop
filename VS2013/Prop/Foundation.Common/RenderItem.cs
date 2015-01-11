//
//         Copyright (c) NiazeRooz.  All rights reserved. 
//
//          Requirement : RenderItem.cshtml - [PartialView]
//                        Convertion Tools
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
    ///     Use This Item When You want to Render Html and Have some Options in Diffrent Conditions For Rendering
    ///     you can set more than one condition into one 
    /// 
    ///     Struct : 
    ///     ┌──────────────┐          ┌────────────────┐
    ///     │  RenderItem  ├──┬──── ○ │  IRenderItem   │
    ///     └────────┬─────┘  │       └────────────────┘
    ///              ↑        │ 
    ///              └───── ← ┘ 
    ///               list 
    ///               
    ///     #sample
    ///     
    ///     Render Html  
    ///     ActionResult ViewName(RenderItem model)
    ///     {
    ///         // 1. render in action;
    ///         return PartialView("RenderItem",model);
    ///     }
    ///     or
    ///     // 2. render in Html contents
    ///     @Html.Partial("RenderItem",model);
    ///     
    ///     
    ///     //code behind
    ///     var model = new ActionItem(){...};
    ///     var model = new PartialItem(){...};
    ///     var model = new ContentItem(){...};
    ///       
    /// </summary>

    public class RenderItem : List<RenderItem>, IRenderItem
    {
        public RenderItem()
            : base()
        {
            Prefix = "";
            Postfix = "";
        }

        public object ViewModel { get; set; }

        /// <summary>
        /// 
        ///     Helper Indexer For Repeated Tools
        /// 
        /// </summary>
        public int Index { get; set; }

        public static int Indexer = 0;

        /// <summary>
        /// 
        ///     Prefix Html Rendered Befor Defined Content
        /// 
        /// </summary>
        public string Prefix { get; set; }

        /// <summary>
        ///     
        ///     Postfix Html Rendered After Defined Content
        /// 
        /// </summary>
        public string Postfix { get; set; }

        /// <summary>
        /// 
        ///     Helper Methode For Set View Model Inline
        ///     new RenderItem(){}.SetViewModel(model);
        /// 
        /// </summary>
        /// <param name="model">view model Object</param>
        /// <returns>Base Instance</returns>
        public RenderItem SetViewModel(object model)
        {
            ViewModel = model;
            return this;
        }

        /// <summary>
        /// 
        ///     Helper Method to marge Multiple render Item in One
        /// 
        /// </summary>
        /// <param name="items">Multiple render Item</param>
        /// <param name="perfix"></param>
        /// <param name="postfix"></param>
        /// <returns>One Render item</returns>
        public static RenderItem CreateRenderItemWithSubItems(List<RenderItem> items, string perfix, string postfix)
        {
            // create Parent
            var renderItem = new RenderItem() { Postfix = postfix, Prefix = perfix };

            // Add Children
            foreach (var i in items)
                renderItem.Add(i);

            return renderItem;
        }

    }

    /// <struct>
    /// 
    ///     ///     Struct : 
    ///     ┌──────────────┐                                     ┌────────────────┐
    ///     │  RenderItem  ├─────────────────────────────┬──── ○ │  IRenderItem   │
    ///     └────────┬─────┘ ┌─────────────────────┐     │       └────────────────┘
    ///              │       │ ┌────────────────┐  │     │
    ///              ├── ← ──┼─┤  ActionItem    ├──┼── ← ┤
    ///              │       │ └────────────────┘  │     │ 
    ///              ↑       │ ┌────────────────┐  │     │ 
    ///              ├── ← ──┼─┤  PartialItem   ├──┼── ← ┤  <list>  
    ///              │       │ └────────────────┘  │     │ 
    ///              │       │ ┌────────────────┐  │     │
    ///              └── ← ──┼─┤  ContentItem   ├──┼── ← ┘
    ///                      │ └────────────────┘  │
    ///                      └──── RenderItem ─────┘
    ///    
    /// 
    /// </struct>


    /// <summery>
    /// 
    ///        introduction Action insted of Render Item
    /// 
    /// </summery>
    public class ActionItem : RenderItem
    {
        public ActionItem()
        {
            AreaName = "";
        }

        /// <summary>
        /// mvc Action Name
        /// </summary>
        public string ActionName { get; set; }

        /// <summary>
        /// mvc Controller Name
        /// </summary>
        public string ControllerName { get; set; }

        /// <summary>
        /// mvc Parameters
        /// * parameter model Filed After Introduction
        /// </summary>
        public object RouteValues { get; set; }

        /// <summary>
        /// mvc Area Name
        /// </summary>
        public string AreaName { get; set; }
    }

    /// <summary>
    ///
    ///     introduction Partial insted of Render Item
    ///     
    /// </summary>
    public class PartialItem : RenderItem
    {
        public string PartialName { get; set; }
    }

    /// <summary>
    /// 
    ///      introduction directly string Content (Template Content ) insted of Render Item 
    ///      
    ///     
    /// </summary>
    public class ContentItem : RenderItem
    {
        /// <summary>
        /// 
        ///     Template
        ///     when Rendering Replace ViewModel values to Properties #[PropertyName] <=> ViewModel.PropertyName.ToString()
        ///     sample :
        ///     1. "<span id='#[Id]'>#[Name]</span>"
        ///     
        /// </summary>
        public string Template { get; set; }
    }
}

