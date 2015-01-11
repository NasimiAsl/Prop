using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace System
{
    /// <summary>
    /// Client And Server Side Validation
    /// </summary>
    public class CSValidation : ValidationBase
    {
        public CSValidation()
            : base()
        {
            Validations = new Dictionary<ValidationModes, object>();
        }

        public string ControlId { get; set; }

        public object Value { get; set; }

        public Dictionary<ValidationModes, object> Validations { get; set; }

    }


    public class CValidationAttribute : Attribute
    {

        public delegate void ValidHandller(CValidationAttribute sender);

        public string Message { get; set; }

        public ValidationModes Mode { get; set; }

        public string ControlName { get; set; }

        public virtual void SetValidation(object value, ref ValidationBase validationResult)
        {
            throw new NotImplementedException();
        }

        public string GenerateValidationInitializerScript(string controlName, string ParentContainerId)
        {
            return "";
        }

        public override string ToString()
        {
            return base.ToString();
        }

        public CValidationAttribute AddControl(string ctl)
        {
            this.ControlName = ctl;
            return this;
        }


    }

    public class Valid : CValidationAttribute
    {
        public string CallBackScript { get; set; }

        public Valid(string validCallBackScript)
        {
            CallBackScript = validCallBackScript;
        }

        public override string ToString()
        {
            if (!string.IsNullOrEmpty(CallBackScript)) { return "valid(function(c,e){" + CallBackScript + ";validation_Valid(c,e);})"; }
            return "";
        }


    }

    public class NotValid : CValidationAttribute
    {
        public string CallBackScript { get; set; }

        public NotValid(string validCallBackScript)
        {
            CallBackScript = validCallBackScript;
        }

        public override string ToString()
        {
            if (!string.IsNullOrEmpty(CallBackScript)) { return "notValid(function(c,e){" + CallBackScript + ";validation_NotValid(c,e);})"; }
            return "";
        }
    }

    public class Required : CValidationAttribute
    {
        public Required(string msg)
        {
            Mode = ValidationModes.Required;
            Message = msg;
        }

        public override string ToString()
        {
            return "required({msg:'" + Message + "'})";
        }

        public override void SetValidation(object value, ref ValidationBase validationResult)
        {
            value.ValidateRequiredField_WithMsg(Message, validationResult);
        }
    }

    public class Range : CValidationAttribute
    {
        public double Min { get; set; }

        public double Max { get; set; }

        public Range(int min, int max, string msg)
        {
            Mode = ValidationModes.Range;
            Message = msg;
            Min = min;
            Max = max;
        }

        public override string ToString()
        {
            return "range({min:" + Min + ",max:" + Max + ",msg:'" + Message + "'})";
        }

        public override void SetValidation(object value, ref ValidationBase validationResult)
        {
            value.ValidateNumberRange_WithMsg((double?)Min, (double?)Max, Message, validationResult);
        }
    }

    public class Length : CValidationAttribute
    {
        public int Min { get; set; }

        public int Max { get; set; }

        public Length(int min, int max, string msg)
        {
            Mode = ValidationModes.Length;
            Message = msg;
            Min = min;
            Max = max;
        }

        public override string ToString()
        {
            return "length({min:" + Min + ",max:" + Max + ",msg:'" + Message + "'})";
        }

        public override void SetValidation(object value, ref ValidationBase validationResult)
        {
            value.ValidateStringLengthRange_WithMsg(Min, Max, Message, validationResult);
        }
    }

    public class LargerThanLen : CValidationAttribute
    {
        public int Min { get; set; }


        public LargerThanLen(int min, string msg)
        {
            Mode = ValidationModes.Length;
            Message = msg;
            Min = min;

        }

        public override string ToString()
        {
            return "largeThanLen({min:" + Min + ",msg:'" + Message + "'})";
        }

        public override void SetValidation(object value, ref ValidationBase validationResult)
        {
            value.ValidateStringLengthRange_WithMsg(Min, null, Message, validationResult);
        }
    }

    public class LowerThanLen : CValidationAttribute
    {

        public int Max { get; set; }

        public LowerThanLen(int max, string msg)
        {
            Mode = ValidationModes.Length;
            Message = msg;
            Max = max;
        }

        public override string ToString()
        {
            return "lowerThanLen({max:" + Max + ",msg:'" + Message + "'})";
        }

        public override void SetValidation(object value, ref ValidationBase validationResult)
        {
            value.ValidateStringLengthRange_WithMsg(null, Max, Message, validationResult);
        }
    }

    public class LargerThan : Range
    {
        public LargerThan(int min, string msg)
            : base(min, int.MaxValue, msg)
        {
            Mode = ValidationModes.LargerThan;

        }

        public override string ToString()
        {
            return "largeThan({min:" + Min + ",msg:'" + Message + "'})";
        }

        public override void SetValidation(object value, ref ValidationBase validationResult)
        {
            value.ValidateNumberRange_WithMsg(Min, null, Message, validationResult);
        }
    }

    public class LowerThan : Range
    {
        public LowerThan(int max, string msg)
            : base(int.MinValue, max, msg)
        {
            Mode = ValidationModes.LowerThan;

        }
        public override string ToString()
        {
            return "lowerThan({max:" + Max + ",msg:'" + Message + "'})";
        }

        public override void SetValidation(object value, ref ValidationBase validationResult)
        {
            value.ValidateNumberRange_WithMsg(null, Max, Message, validationResult);
        }
    }

    public class Match : CValidationAttribute
    {
        public string MatchValue { get; set; }

        public Match(string matchCtl, string msg)
        {
            Mode = ValidationModes.Match;
            Message = msg;
            MatchValue = matchCtl;
        }

        public override string ToString()
        {
            return "match({value:" + MatchValue + ",msg:'" + Message + "'})";
        }

        public override void SetValidation(object value, ref ValidationBase validationResult)
        {
            value.ValidateMatch_WithMsg(MatchValue, Message, validationResult);
        }
    }

    public class VRegex : CValidationAttribute
    {
        public string RegexPattern { get; set; }
        public string RegexScriptPattern { get; set; }

        public VRegex(string regexScriptPattern, string pattern, string msg)
        {
            Mode = ValidationModes.Regex;
            Message = msg;
            RegexPattern = pattern;
            RegexScriptPattern = regexScriptPattern;
        }
        public VRegex(  string pattern, string msg)
        {
            Mode = ValidationModes.Regex;
            Message = msg;
            RegexPattern = pattern;
        }

        public override string ToString()
        {
            return "regex({pattern:" + RegexScriptPattern + ",msg:'" + Message + "'})";
        }

        public override void SetValidation(object value, ref ValidationBase validationResult)
        {
            value.ValidateRegex_WithMsg(RegexPattern, Message, validationResult);
        }
    }

    public class VInteger : CValidationAttribute
    {
        public VInteger(string msg)
        {
            Mode = ValidationModes.Integer;
            Message = msg;
        }

        public override string ToString()
        {
            return "integer({msg:'" + Message + "'})";
        }

        public override void SetValidation(object value, ref ValidationBase validationResult)
        {
            value.ValidateRegex_WithMsg(ExtentionMethods.RegexTypes.Integer, Message, validationResult);
        }
    }

    public class VReal : CValidationAttribute
    {
        public VReal(string msg)
        {
            Mode = ValidationModes.Real;
            Message = msg;
        }

        public override string ToString()
        {
            return "real({msg:'" + Message + "'})";
        }


        public override void SetValidation(object value, ref ValidationBase validationResult)
        {
            value.ValidateRegex_WithMsg(ExtentionMethods.RegexTypes.Real, Message, validationResult);
        }

    }

    public class Mail : CValidationAttribute
    {
        public Mail(string msg)
        {
            Mode = ValidationModes.Mail;
            Message = msg;
        }

        public override string ToString()
        {
            return "mail({msg:'" + Message + "'})";
        }

        public override void SetValidation(object value, ref ValidationBase validationResult)
        {
            value.ValidateRegex_WithMsg(ExtentionMethods.RegexTypes.MailPattern, Message, validationResult);
        }
    }

    public enum ValidationModes
    {
        Required,
        Range,
        LargerThan,
        LowerThan,
        LargerThanLen,
        LowerThanLen,
        Length,
        Match,
        Regex,
        Integer,
        Real,
        Mail
    }

    public static class ValidationExtensionMethods
    {

        public static string GetValidationScript(this object model, string ParentContainerId, string more = null)
        {
            var properties = model.GetType().GetProperties();

            var script = "";
            foreach (var prp in properties)
            {
                script +=   model.GetValidationScript(prp.Name, prp.Name, ParentContainerId)+ "\n";
            }

            return script;
        }
        public static string GetValidationScript(this object model, string propertyName, string controlName, string ParentContainerId, string more = null)
        {
            Type type = model.GetType();
            var attributes = (from x in type.GetProperties()
                              from y in x.GetCustomAttributes(typeof(CValidationAttribute), true)
                              where x.Name == propertyName
                              select y).ToList();

            var result = "";
            if (attributes.Count == 0)
                return "";
            foreach (var k in attributes)
                result += "." + k.ToString();

            return string.Format("validation{0}.set('#{1} #{2}');", result + more.To<string>(""), ParentContainerId, controlName);
        }

        public static string GetValidationMessage(this object model)
        {
            var properties = model.GetType().GetProperties();

            var message = "";
            foreach (var prp in properties)
            {
                var msg = model.GetValidationMessage(prp.Name);
                if (msg != "")
                    message += "<br/>" + msg;
            }

            return message;
        }
        public static string GetValidationMessage(this object model, string propertyName)
        {
            Type type = model.GetType();
            var prp = type.GetProperties().Where(x => x.Name == propertyName).First();
            var attributes = (from y in prp.GetCustomAttributes(typeof(CValidationAttribute), true)

                              select (CValidationAttribute)y).ToList();


            ValidationBase vbase = new ValidationBase();
            var val = prp.GetValue(model);
            foreach (var k in attributes)
            {
                k.SetValidation(val, ref vbase);
            }

            return string.Join("<br/>", vbase.ValidationMessages);
        }



        public static CSValidation CheckValidation<ValidationType>(this object o, ValidationType validationParams) where ValidationType : CValidationAttribute
        {
            if (o != null && o.GetType() == typeof(CSValidation))
            {
                ((CSValidation)o).Validations.Add(((CValidationAttribute)validationParams).Mode, validationParams);
                return (CSValidation)o;
            }
            else
            {
                var csValidation = new CSValidation();
                csValidation.Value = o;
                csValidation.Validations.Add(((CValidationAttribute)validationParams).Mode, validationParams);

                return csValidation;
            }
        }

        public static bool IsValid(this CSValidation o)
        {
            var result = new ValidationBase();
            if (o.Validations.Count > 0)

                foreach (var val in o.Validations.Keys)
                {
                    ((CValidationAttribute)o.Validations[val]).SetValidation(o.Value, ref result);
                }

            return false;
        }

        public static string ToScript(this CSValidation o, string selector, string group = "", string notValid = "", string valid = "")
        {
            var result = "";
            if (o.Validations.Count > 0)
            {
                foreach (var val in o.Validations.Keys)
                {
                    result += "." + ((CValidationAttribute)o.Validations[val]).ToString();
                }
            }

            if (!string.IsNullOrEmpty(group))
                group = ".group('" + group + "')";
            else group += "";

            result = string.Format("validation{0}{1}.set('{2}')", result,
                (notValid == "" ? "" : ".notValid(" + notValid + ")") +
                (valid == "" ? "" : ".valid(" + valid + ")") + group,
                selector);

            return result;
        }

        public static string ToScript(this List<CValidationAttribute> l, string selector, string group = "", string notValid = "", string valid = "")
        {
            var result = "";
            if (l.Count > 0)
            {
                foreach (var val in l)
                {
                    result += "." + (val).ToString();
                }
            }

            if (!string.IsNullOrEmpty(group))
                group = ".group('" + group + "')";
            else group += "";

            result = string.Format("validation{0}{1}.set('{2}')", result,
                (notValid == "" ? "" : ".notValid(" + notValid + ")") +
                (valid == "" ? "" : ".valid(" + valid + ")") + group,
                selector);

            return result;
        }


        public static List<CValidationAttribute> AddValidationAttr<T>(this List<CValidationAttribute> l, T instance) where T : CValidationAttribute
        {
            if (l == null) l = new List<CValidationAttribute>();

            l.Add(instance);

            return l;
        }
    }
}
