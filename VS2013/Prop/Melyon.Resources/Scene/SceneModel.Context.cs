﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Melyon.Resources.Scene
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class EntitiesScene : DbContext
    {
        public EntitiesScene()
            : base("name=EntitiesScene")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Object> Objects { get; set; }
    
        public virtual int Stored_0013(Nullable<int> objects_ID, string objects_Name, string objects_Script, Nullable<int> kIND)
        {
            var objects_IDParameter = objects_ID.HasValue ?
                new ObjectParameter("Objects_ID", objects_ID) :
                new ObjectParameter("Objects_ID", typeof(int));
    
            var objects_NameParameter = objects_Name != null ?
                new ObjectParameter("Objects_Name", objects_Name) :
                new ObjectParameter("Objects_Name", typeof(string));
    
            var objects_ScriptParameter = objects_Script != null ?
                new ObjectParameter("Objects_Script", objects_Script) :
                new ObjectParameter("Objects_Script", typeof(string));
    
            var kINDParameter = kIND.HasValue ?
                new ObjectParameter("KIND", kIND) :
                new ObjectParameter("KIND", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("Stored_0013", objects_IDParameter, objects_NameParameter, objects_ScriptParameter, kINDParameter);
        }
    
        public virtual ObjectResult<Stored_0014_Result> Stored_0014(string objects_Name)
        {
            var objects_NameParameter = objects_Name != null ?
                new ObjectParameter("Objects_Name", objects_Name) :
                new ObjectParameter("Objects_Name", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Stored_0014_Result>("Stored_0014", objects_NameParameter);
        }
    }
}
