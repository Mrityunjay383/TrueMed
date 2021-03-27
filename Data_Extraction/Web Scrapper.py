import json
file=open('./data.txt','r')
s=file.read()
l=len(s)
list1=[]
for i in range(0,l-3):
    if (s[i],s[i+1],s[i+2])==('<','/','t'):
        k=i-1
        r=''
        while(s[k]!='>'):
            r+=s[k]
            k-=1
        r=r[::-1]
        list1+=[r]

l2=[]
for i in range(0,len(list1)):
    if i%7 not in [0,2,5,6]:
        l2+=[list1[i]]
f=[]
for i in range(0,len(l2)):
    if i%3==0:
        d = {}
        d['Salt']=l2[i]
    if i%3==1:
        d['Quantity']=l2[i]
    if i%3==2:
        d['price']=l2[i]
        f.append(d)
print(len(f))
file2=open('./data.json','a')
for i in f:
    json_object = json.dumps(i, indent=4)
    file2.write(json_object)
    file2.write(',')
    file2.write('\n')
file2.close()
file.close()
