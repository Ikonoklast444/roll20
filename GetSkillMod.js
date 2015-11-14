//This script with get the Skill Mod of the given tokeno bject for the pathfinder default character sheet.

function getSkillMod(charID, skill, mod)
{
    
    var isNullReturn0 = function(charID, attribute)
    {
        if (getAttrByName(charID,attribute)=="" || isNaN(getAttrByName(charID,attribute)))
        {      
          return 0;
        } 
        else 
        { 
          return parseInt(getAttrByName(charID,attribute));
        }
    }
    
    var getStatMod = function(charID, stat)
    {
        var statTotal = 0;
        for(i=1; i<=10;i++)
        {
            statTotal += isNullReturn0(charID,"buff"+i+"_Toggle") * isNullReturn0(charID,"buff" + i + "_" + stat + "_macro-text");
        }
        var statbase = parseInt(getAttrByName(charID,stat + "-base")) + parseInt(getAttrByName(charID,stat + "-enhance"))  + parseInt(getAttrByName(charID,stat + "-misc"))  +statTotal  + parseInt(getAttrByName(charID,stat + "-drain"));
        var stat_mod = ((Math.floor(statbase/2)-5) + 
            (Math.floor(isNullReturn0(charID,stat + "-temp")/2)) - 
            (Math.floor(Math.abs(isNullReturn0(charID,stat + "-damage")/2))) - 
            (Math.floor(Math.abs(isNullReturn0(charID,stat + "-penalty")/2))));
        
        return stat_mod;
    }
    
  
    var xRanks = isNullReturn0(charID,skill + "-ranks");
    var xClass = ((((3 * xRanks) + 3) - Math.abs((3 * xRanks) - 3)) / 2)
    var xAbility = getStatMod(charID,mod);  
    var xRacial = isNullReturn0(charID,skill + "-racial");
    var xFeat = isNullReturn0(charID,skill + "-feat");
    var xItem = isNullReturn0(charID,skill + "-item");
    var xMisc = isNullReturn0(charID,skill + "-misc");
    var xFear = isNullReturn0(charID,"condition-Fear");
    var xSick = isNullReturn0(charID,"condition-sickened");
    var xDrained = isNullReturn0(charID,"condition-Drained");
    var xWounds = isNullReturn0(charID,"condition-Wounds");
    
    
    var xSkill = parseInt(xRanks) + parseInt(xClass) + parseInt(xAbility) + parseInt(xRacial) + parseInt(xFeat) + 
        parseInt(xItem) + parseInt(xMisc) - parseInt(xFear) - parseInt(xSick) + parseInt(xDrained) - parseInt(xWounds);

    return xSkill;
    
    
    
}






